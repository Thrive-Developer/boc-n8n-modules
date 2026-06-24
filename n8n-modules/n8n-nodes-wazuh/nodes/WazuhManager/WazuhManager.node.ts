import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError, NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

import { activeResponseDescription } from './ActiveResponseDescription';
import { agentDescription } from './AgentDescription';
import { decoderDescription } from './DecoderDescription';
import {
	buildActiveResponsePayload,
	buildAgentGetQuery,
	buildAgentListQuery,
	buildAlertSearchBody,
	buildCveSearchBody,
	buildIndexerSearchEndpoint,
	getResourceApiScope,
	getResponseBody,
	normalizeWazuhCollection,
	normalizeWazuhSearch,
	parseCommaSeparatedList,
	parseJsonObjectParameter,
	validateRequiredParameter,
	wazuhIndexerApiRequest,
	wazuhManagerApiRequest,
} from './GenericFunctions';
import { indexerDescription } from './IndexerDescription';
import { ruleDescription } from './RuleDescription';
import { securityEventDescription } from './SecurityEventDescription';
import { vulnerabilityDescription } from './VulnerabilityDescription';

export class WazuhManager implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Wazuh',
		name: 'wazuhManager',
		icon: 'file:boc.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Work with the Wazuh Server API and Wazuh Indexer API',
		defaults: {
			name: 'Wazuh',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'wazuhManagerApi',
				required: true,
				displayOptions: {
					show: {
						resource: ['activeResponse', 'agent', 'decoder', 'rule'],
					},
				},
			},
			{
				name: 'wazuhIndexerApi',
				required: true,
				displayOptions: {
					show: {
						resource: ['indexer', 'securityEvent', 'vulnerability'],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Active Response',
						value: 'activeResponse',
					},
					{
						name: 'Agent',
						value: 'agent',
					},
					{
						name: 'Decoder',
						value: 'decoder',
					},
					{
						name: 'Indexer',
						value: 'indexer',
					},
					{
						name: 'Rule',
						value: 'rule',
					},
					{
						name: 'Security Event',
						value: 'securityEvent',
					},
					{
						name: 'Vulnerability',
						value: 'vulnerability',
					},
				],
				default: 'activeResponse',
			},
			...activeResponseDescription,
			...agentDescription,
			...vulnerabilityDescription,
			...securityEventDescription,
			...indexerDescription,
			...decoderDescription,
			...ruleDescription,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const resource = this.getNodeParameter('resource', itemIndex) as string;
				const operation = this.getNodeParameter('operation', itemIndex) as string;
				const apiScope = getResourceApiScope(resource);
				let json: IDataObject;

				if (apiScope === 'manager') {
					json = await executeManagerResource.call(this, resource, operation, itemIndex);
				} else {
					json = await executeIndexerResource.call(this, resource, operation, itemIndex);
				}

				returnData.push({
					json,
					pairedItem: {
						item: itemIndex,
					},
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error instanceof Error ? error.message : String(error),
						},
						pairedItem: {
							item: itemIndex,
						},
					});
					continue;
				}

				if (error instanceof NodeApiError) {
					throw new NodeApiError(
						this.getNode(),
						{
							message: error.message,
						},
						{ itemIndex, httpCode: error.httpCode ?? undefined },
					);
				}

				if (error instanceof NodeOperationError) {
					throw new NodeOperationError(this.getNode(), error.message, {
						itemIndex,
					});
				}

				if (error instanceof Error) {
					throw new NodeOperationError(this.getNode(), error.message, {
						itemIndex,
					});
				}

				throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex });
			}
		}

		return [returnData];
	}
}

async function executeManagerResource(
	this: IExecuteFunctions,
	resource: string,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	if (resource === 'activeResponse' && operation === 'runCommand') {
		return executeActiveResponse.call(this, itemIndex);
	}

	if (resource === 'agent' && operation === 'list') {
		return executeAgentList.call(this, itemIndex);
	}

	if (resource === 'agent' && operation === 'get') {
		return executeAgentGet.call(this, itemIndex);
	}

	if (resource === 'agent' && operation === 'restart') {
		return executeAgentRestart.call(this, itemIndex);
	}

	if (resource === 'decoder' && operation === 'list') {
		return executeDecoderList.call(this, itemIndex);
	}

	if (resource === 'rule' && operation === 'get') {
		return executeRuleGet.call(this, itemIndex);
	}

	throw new NodeOperationError(
		this.getNode(),
		`Unsupported operation "${operation}" for resource "${resource}"`,
		{ itemIndex },
	);
}

async function executeIndexerResource(
	this: IExecuteFunctions,
	resource: string,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	if (resource === 'vulnerability' && operation === 'searchCve') {
		return executeVulnerabilitySearchCve.call(this, itemIndex);
	}

	if (resource === 'securityEvent' && operation === 'searchAlerts') {
		return executeSecurityEventSearchAlerts.call(this, itemIndex);
	}

	if (resource === 'indexer' && operation === 'query') {
		return executeIndexerQuery.call(this, itemIndex);
	}

	throw new NodeOperationError(
		this.getNode(),
		`Unsupported operation "${operation}" for resource "${resource}"`,
		{ itemIndex },
	);
}

async function executeActiveResponse(
	this: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	const command = this.getNodeParameter('command', itemIndex) as string;
	const agentsInput = this.getNodeParameter('agents', itemIndex) as string;
	const argumentsInput = this.getNodeParameter('arguments', itemIndex, '') as string;
	const alertDataInput = this.getNodeParameter('alertData', itemIndex, '{}') as
		| IDataObject
		| string;
	const waitForComplete = this.getNodeParameter('waitForComplete', itemIndex, false) as boolean;

	const agents = parseCommaSeparatedList(agentsInput);
	const commandArguments = parseCommaSeparatedList(argumentsInput);
	const alertData = parseJsonObjectParameter.call(this, alertDataInput, itemIndex, 'Alert Data');

	const qs: IDataObject = {
		wait_for_complete: waitForComplete,
	};

	if (agents.length > 0) {
		qs.agents_list = agents.join(',');
	}

	const payload = buildActiveResponsePayload(command, commandArguments, alertData);
	const response = await wazuhManagerApiRequest.call(
		this,
		'PUT',
		'/active-response',
		payload,
		qs,
		itemIndex,
	);

	return getResponseBody(response);
}

async function executeAgentList(this: IExecuteFunctions, itemIndex: number): Promise<IDataObject> {
	const query = buildAgentListQuery({
		status: this.getNodeParameter('status', itemIndex, '') as string,
		select: this.getNodeParameter('select', itemIndex, '') as string,
		limit: this.getNodeParameter('limit', itemIndex) as number,
		offset: this.getNodeParameter('offset', itemIndex) as number,
		search: this.getNodeParameter('search', itemIndex, '') as string,
	});
	const response = await wazuhManagerApiRequest.call(this, 'GET', '/agents', {}, query, itemIndex);

	return normalizeWazuhCollection(getResponseBody(response));
}

async function executeAgentGet(this: IExecuteFunctions, itemIndex: number): Promise<IDataObject> {
	const agentId = this.getNodeParameter('agentId', itemIndex) as string;
	const select = this.getNodeParameter('select', itemIndex, '') as string;
	const query = buildAgentGetQuery(agentId, select);
	const response = await wazuhManagerApiRequest.call(this, 'GET', '/agents', {}, query, itemIndex);
	const collection = normalizeWazuhCollection(getResponseBody(response));
	const agent = collection.items[0];

	if (agent === undefined) {
		throw new NodeOperationError(this.getNode(), `Agent "${agentId}" was not found`, {
			itemIndex,
		});
	}

	return {
		...agent,
		_metadata: {
			message: collection.message,
			total: collection.total,
			totalFailed: collection.totalFailed,
			failedItems: collection.failedItems,
		},
	};
}

async function executeAgentRestart(this: IExecuteFunctions, itemIndex: number): Promise<IDataObject> {
	const agentId = validateRequiredParameter(
		this.getNodeParameter('agentId', itemIndex) as string,
		'Agent ID',
	);
	const waitForComplete = this.getNodeParameter('waitForComplete', itemIndex, false) as boolean;
	const response = await wazuhManagerApiRequest.call(
		this,
		'PUT',
		`/agents/${encodeURIComponent(agentId)}/restart`,
		{},
		{
			wait_for_complete: waitForComplete,
		},
		itemIndex,
	);

	return getResponseBody(response);
}

async function executeDecoderList(this: IExecuteFunctions, itemIndex: number): Promise<IDataObject> {
	const query: IDataObject = {
		limit: this.getNodeParameter('limit', itemIndex) as number,
		offset: this.getNodeParameter('offset', itemIndex) as number,
	};
	const decoderName = this.getNodeParameter('decoderName', itemIndex, '') as string;
	const filename = this.getNodeParameter('filename', itemIndex, '') as string;
	const relativeDirname = this.getNodeParameter('relativeDirname', itemIndex, '') as string;
	const status = this.getNodeParameter('status', itemIndex, '') as string;
	const search = this.getNodeParameter('search', itemIndex, '') as string;
	const select = this.getNodeParameter('select', itemIndex, '') as string;

	if (decoderName.trim() !== '') {
		query.decoder_names = decoderName.trim();
	}

	if (filename.trim() !== '') {
		query.filename = filename.trim();
	}

	if (relativeDirname.trim() !== '') {
		query.relative_dirname = relativeDirname.trim();
	}

	if (status.trim() !== '') {
		query.status = status.trim();
	}

	if (search.trim() !== '') {
		query.search = search.trim();
	}

	if (select.trim() !== '') {
		query.select = select.trim();
	}

	const response = await wazuhManagerApiRequest.call(this, 'GET', '/decoders', {}, query, itemIndex);

	return normalizeWazuhCollection(getResponseBody(response));
}

async function executeRuleGet(this: IExecuteFunctions, itemIndex: number): Promise<IDataObject> {
	const filename = validateRequiredParameter(
		this.getNodeParameter('filename', itemIndex) as string,
		'Filename',
	);
	const relativeDirname = this.getNodeParameter('relativeDirname', itemIndex, '') as string;
	const query: IDataObject = {};

	if (relativeDirname.trim() !== '') {
		query.relative_dirname = relativeDirname.trim();
	}

	const response = await wazuhManagerApiRequest.call(
		this,
		'GET',
		`/rules/files/${encodeURIComponent(filename)}`,
		{},
		query,
		itemIndex,
	);
	const collection = normalizeWazuhCollection(getResponseBody(response));
	const content = collection.items[0];

	if (content === undefined) {
		throw new NodeOperationError(this.getNode(), `Rule file "${filename}" was not found`, {
			itemIndex,
		});
	}

	return {
		filename,
		relativeDirname: relativeDirname || undefined,
		content,
		_metadata: {
			message: collection.message,
			total: collection.total,
			totalFailed: collection.totalFailed,
			failedItems: collection.failedItems,
		},
	};
}

async function executeVulnerabilitySearchCve(
	this: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	const cveId = this.getNodeParameter('cveId', itemIndex) as string;
	const index = this.getNodeParameter('index', itemIndex) as string;
	const size = this.getNodeParameter('size', itemIndex) as number;
	const from = this.getNodeParameter('from', itemIndex) as number;
	const body = buildCveSearchBody(cveId, size, from);
	const response = await wazuhIndexerApiRequest.call(
		this,
		'POST',
		buildIndexerSearchEndpoint(index),
		body,
		{},
		itemIndex,
	);

	return normalizeWazuhSearch(getResponseBody(response));
}

async function executeSecurityEventSearchAlerts(
	this: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	const index = this.getNodeParameter('index', itemIndex) as string;
	const queryMode = this.getNodeParameter('queryMode', itemIndex) as string;
	const size = this.getNodeParameter('size', itemIndex) as number;
	const from = this.getNodeParameter('from', itemIndex) as number;
	let body: IDataObject;

	if (queryMode === 'dsl') {
		const queryBody = this.getNodeParameter('queryBody', itemIndex, '{}') as IDataObject | string;
		body = parseJsonObjectParameter.call(this, queryBody, itemIndex, 'Query JSON');
		body.size = size;
		body.from = from;
	} else {
		const filters = this.getNodeParameter('filters', itemIndex, {}) as IDataObject;
		body = buildAlertSearchBody(
			{
				...filters,
				sortField: this.getNodeParameter('sortField', itemIndex, '@timestamp') as string,
				sortOrder: this.getNodeParameter('sortOrder', itemIndex, 'desc') as string,
			},
			size,
			from,
		);
	}

	const response = await wazuhIndexerApiRequest.call(
		this,
		'POST',
		buildIndexerSearchEndpoint(index),
		body,
		{},
		itemIndex,
	);

	return normalizeWazuhSearch(getResponseBody(response));
}

async function executeIndexerQuery(this: IExecuteFunctions, itemIndex: number): Promise<IDataObject> {
	const method = this.getNodeParameter('method', itemIndex) as 'GET' | 'POST';
	const index = this.getNodeParameter('index', itemIndex) as string;
	const queryBody = this.getNodeParameter('queryBody', itemIndex, '{}') as IDataObject | string;
	const body = parseJsonObjectParameter.call(this, queryBody, itemIndex, 'Query JSON');
	const response = await wazuhIndexerApiRequest.call(
		this,
		method,
		buildIndexerSearchEndpoint(index),
		body,
		{},
		itemIndex,
	);
	const responseBody = getResponseBody(response);

	if (responseBody.hits !== undefined) {
		return normalizeWazuhSearch(responseBody);
	}

	return responseBody;
}
