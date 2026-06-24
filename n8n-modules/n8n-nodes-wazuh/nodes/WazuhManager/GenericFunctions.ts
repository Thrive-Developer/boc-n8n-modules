import type { IDataObject, IExecuteFunctions, IHttpRequestOptions, JsonObject } from 'n8n-workflow';
import { NodeApiError, NodeOperationError } from 'n8n-workflow';

import {
	authenticate,
	getBaseUrl,
	validateWazuhManagerApiCredentials,
	WAZUH_MANAGER_API_CREDENTIAL_NAME,
} from '../../credentials/WazuhManagerApi.credentials';
import {
	getIndexerBaseUrl,
	validateWazuhIndexerApiCredentials,
	WAZUH_INDEXER_API_CREDENTIAL_NAME,
} from '../../credentials/WazuhIndexerApi.credentials';

export interface WazuhActiveResponsePayload extends IDataObject {
	command: string;
	arguments?: string[];
	alert?: {
		data: IDataObject;
	};
}

export interface WazuhHttpResponse extends IDataObject {
	statusCode?: number;
	statusMessage?: string;
	body?: IDataObject | IDataObject[] | string;
}

export interface WazuhCollectionResult extends IDataObject {
	items: IDataObject[];
	total: number;
	totalFailed: number;
	failedItems: IDataObject[];
	message?: string;
	error?: number;
}

export interface WazuhSearchResult extends IDataObject {
	items: IDataObject[];
	total: number;
	relation?: string;
	took?: number;
	timedOut?: boolean;
	shards?: IDataObject;
}

export type WazuhApiScope = 'manager' | 'indexer';

interface WazuhManagerData extends IDataObject {
	affected_items?: IDataObject[];
	total_affected_items?: number;
	total_failed_items?: number;
	failed_items?: IDataObject[];
}

interface WazuhManagerBody extends IDataObject {
	data?: WazuhManagerData;
	message?: string;
	error?: number;
}

interface WazuhIndexerHit extends IDataObject {
	_index?: string;
	_id?: string;
	_score?: number;
	_source?: IDataObject;
	fields?: IDataObject;
	sort?: IDataObject[];
}

interface WazuhIndexerTotal extends IDataObject {
	value?: number;
	relation?: string;
}

interface WazuhIndexerHits extends IDataObject {
	total?: number | WazuhIndexerTotal;
	hits?: WazuhIndexerHit[];
}

interface WazuhIndexerSearchBody extends IDataObject {
	took?: number;
	timed_out?: boolean;
	_shards?: IDataObject;
	hits?: WazuhIndexerHits;
}

export function parseCommaSeparatedList(value: string): string[] {
	return value
		.split(',')
		.map((entry) => entry.trim())
		.filter((entry) => entry !== '');
}

export function validateRequiredParameter(value: string, fieldName: string): string {
	const trimmedValue = value.trim();

	if (trimmedValue === '') {
		throw new Error(`${fieldName} is required`);
	}

	return trimmedValue;
}

export function validateCveId(cveId: string): string {
	const normalizedCveId = validateRequiredParameter(cveId, 'CVE ID').toUpperCase();

	if (!/^CVE-\d{4}-\d{4,}$/.test(normalizedCveId)) {
		throw new Error('CVE ID must use the format CVE-YYYY-NNNN');
	}

	return normalizedCveId;
}

export function validateIndexerIndex(index: string): string {
	const normalizedIndex = validateRequiredParameter(index, 'Index').replace(/^\/+|\/+$/g, '');

	if (
		normalizedIndex.includes('://') ||
		/[/?#\\\s]/.test(normalizedIndex) ||
		normalizedIndex === '_all'
	) {
		throw new Error('Index must be an index name or pattern, not a URL or reserved wildcard');
	}

	return normalizedIndex;
}

export function parseJsonObjectParameter(
	this: IExecuteFunctions,
	value: IDataObject | string,
	itemIndex: number,
	fieldName: string,
): IDataObject {
	if (typeof value !== 'string') {
		if (Array.isArray(value)) {
			throw new NodeOperationError(this.getNode(), `${fieldName} must be a JSON object`, {
				itemIndex,
			});
		}

		return value;
	}

	const trimmedValue = value.trim();

	if (trimmedValue === '') {
		return {};
	}

	try {
		const parsedValue = JSON.parse(trimmedValue) as unknown;

		if (
			typeof parsedValue !== 'object' ||
			parsedValue === null ||
			Array.isArray(parsedValue)
		) {
			throw new Error(`${fieldName} must be a JSON object`);
		}

		return parsedValue as IDataObject;
	} catch (error) {
		throw new NodeOperationError(this.getNode(), `Invalid JSON in ${fieldName}`, {
			itemIndex,
			description: error instanceof Error ? error.message : undefined,
		});
	}
}

export function buildActiveResponsePayload(
	command: string,
	commandArguments: string[],
	alertData: IDataObject,
): WazuhActiveResponsePayload {
	const payload: WazuhActiveResponsePayload = {
		command,
	};

	if (commandArguments.length > 0) {
		payload.arguments = commandArguments;
	}

	if (Object.keys(alertData).length > 0) {
		payload.alert = {
			data: alertData,
		};
	}

	return payload;
}

export function buildAgentListQuery(options: IDataObject): IDataObject {
	const qs: IDataObject = {};

	for (const key of ['status', 'select', 'limit', 'offset', 'search'] as const) {
		const value = options[key];

		if (value !== undefined && value !== null && value !== '') {
			qs[key] = value;
		}
	}

	return qs;
}

export function buildAgentGetQuery(agentId: string, select?: string): IDataObject {
	const qs: IDataObject = {
		agents_list: validateRequiredParameter(agentId, 'Agent ID'),
	};

	if (select !== undefined && select.trim() !== '') {
		qs.select = select.trim();
	}

	return qs;
}

export function buildCveSearchBody(cveId: string, size: number, from: number): IDataObject {
	return {
		query: {
			term: {
				'vulnerability.id': validateCveId(cveId),
			},
		},
		size,
		from,
	};
}

export function buildAlertSearchBody(filters: IDataObject, size: number, from: number): IDataObject {
	const must: IDataObject[] = [];
	const filter: IDataObject[] = [];
	const sortField = typeof filters.sortField === 'string' ? filters.sortField.trim() : '@timestamp';
	const sortOrder = filters.sortOrder === 'asc' ? 'asc' : 'desc';

	if (typeof filters.queryString === 'string' && filters.queryString.trim() !== '') {
		must.push({
			query_string: {
				query: filters.queryString.trim(),
			},
		});
	}

	if (typeof filters.agentId === 'string' && filters.agentId.trim() !== '') {
		filter.push({
			term: {
				'agent.id': filters.agentId.trim(),
			},
		});
	}

	if (typeof filters.ruleId === 'string' && filters.ruleId.trim() !== '') {
		filter.push({
			term: {
				'rule.id': filters.ruleId.trim(),
			},
		});
	}

	const ruleLevelRange: IDataObject = {};

	if (typeof filters.minRuleLevel === 'number') {
		ruleLevelRange.gte = filters.minRuleLevel;
	}

	if (typeof filters.maxRuleLevel === 'number') {
		ruleLevelRange.lte = filters.maxRuleLevel;
	}

	if (Object.keys(ruleLevelRange).length > 0) {
		filter.push({
			range: {
				'rule.level': ruleLevelRange,
			},
		});
	}

	const timestampRange: IDataObject = {};

	if (typeof filters.timestampFrom === 'string' && filters.timestampFrom.trim() !== '') {
		timestampRange.gte = filters.timestampFrom.trim();
	}

	if (typeof filters.timestampTo === 'string' && filters.timestampTo.trim() !== '') {
		timestampRange.lte = filters.timestampTo.trim();
	}

	if (Object.keys(timestampRange).length > 0) {
		filter.push({
			range: {
				'@timestamp': timestampRange,
			},
		});
	}

	const query =
		must.length === 0 && filter.length === 0
			? {
					match_all: {},
				}
			: {
					bool: {
						must,
						filter,
					},
				};

	const body: IDataObject = {
		query,
		size,
		from,
	};

	if (sortField !== '') {
		body.sort = [
			{
				[sortField]: {
					order: sortOrder,
				},
			},
		];
	}

	return body;
}

export function buildIndexerSearchEndpoint(index: string): string {
	return `/${encodeURI(validateIndexerIndex(index))}/_search`;
}

export function getResourceApiScope(resource: string): WazuhApiScope {
	if (['activeResponse', 'agent', 'decoder', 'rule'].includes(resource)) {
		return 'manager';
	}

	if (['indexer', 'securityEvent', 'vulnerability'].includes(resource)) {
		return 'indexer';
	}

	throw new Error(`Unsupported resource "${resource}"`);
}

function normalizeErrorResponseBody(body: WazuhHttpResponse['body']): JsonObject {
	if (typeof body === 'object' && body !== null && !Array.isArray(body)) {
		return body as JsonObject;
	}

	return {
		body: body === undefined ? '' : String(body),
	};
}

function assertSuccessfulResponse(
	this: IExecuteFunctions,
	response: WazuhHttpResponse,
	itemIndex: number,
	apiName: string,
): void {
	const statusCode = Number(response.statusCode);

	if (!Number.isInteger(statusCode) || (statusCode >= 200 && statusCode < 300)) {
		return;
	}

	throw new NodeApiError(
		this.getNode(),
		{
			message: response.statusMessage ?? `${apiName} request failed`,
			statusCode,
			response: normalizeErrorResponseBody(response.body),
		},
		{
			itemIndex,
			httpCode: String(statusCode),
		},
	);
}

export async function wazuhManagerApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestOptions['method'],
	endpoint: string,
	body: IDataObject,
	qs: IDataObject,
	itemIndex: number,
): Promise<WazuhHttpResponse> {
	const token = await authenticate.call(this);
	const credentials = validateWazuhManagerApiCredentials(
		await this.getCredentials(WAZUH_MANAGER_API_CREDENTIAL_NAME),
	);
	const baseUrl = getBaseUrl(credentials);

	const options: IHttpRequestOptions = {
		method,
		url: `${baseUrl}${endpoint}`,
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/json',
		},
		qs,
		body: Object.keys(body).length > 0 ? body : undefined,
		json: true,
		returnFullResponse: true,
		ignoreHttpStatusErrors: true,
		// n8n maps this to rejectUnauthorized = !allowUnauthorizedCerts.
		skipSslCertificateValidation: credentials.allowUnauthorizedCerts,
	};

	const response = (await this.helpers.httpRequest.call(this, options)) as WazuhHttpResponse;
	assertSuccessfulResponse.call(this, response, itemIndex, 'Wazuh Manager API');

	return response;
}

export async function wazuhIndexerApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestOptions['method'],
	endpoint: string,
	body: IDataObject,
	qs: IDataObject,
	itemIndex: number,
): Promise<WazuhHttpResponse> {
	const credentials = validateWazuhIndexerApiCredentials(
		await this.getCredentials(WAZUH_INDEXER_API_CREDENTIAL_NAME),
	);
	const baseUrl = getIndexerBaseUrl(credentials);

	const options: IHttpRequestOptions = {
		method,
		url: `${baseUrl}${endpoint}`,
		auth: {
			username: credentials.username,
			password: credentials.password,
		},
		headers: {
			Accept: 'application/json',
		},
		qs,
		body: Object.keys(body).length > 0 ? body : undefined,
		json: true,
		returnFullResponse: true,
		ignoreHttpStatusErrors: true,
		// n8n maps this to rejectUnauthorized = !allowUnauthorizedCerts.
		skipSslCertificateValidation: credentials.allowUnauthorizedCerts,
	};

	const response = (await this.helpers.httpRequest.call(this, options)) as WazuhHttpResponse;
	assertSuccessfulResponse.call(this, response, itemIndex, 'Wazuh Indexer API');

	return response;
}

export function getResponseBody(response: WazuhHttpResponse): IDataObject {
	if (typeof response.body === 'object' && response.body !== null && !Array.isArray(response.body)) {
		return response.body;
	}

	return {
		body: response.body,
	};
}

export function normalizeWazuhCollection(responseBody: IDataObject): WazuhCollectionResult {
	const body = responseBody as WazuhManagerBody;
	const data = body.data ?? {};
	const items = Array.isArray(data.affected_items) ? data.affected_items : [];

	return {
		items,
		total: Number(data.total_affected_items ?? items.length),
		totalFailed: Number(data.total_failed_items ?? 0),
		failedItems: Array.isArray(data.failed_items) ? data.failed_items : [],
		message: body.message,
		error: body.error,
	};
}

export function normalizeWazuhSearch(responseBody: IDataObject): WazuhSearchResult {
	const body = responseBody as WazuhIndexerSearchBody;
	const hits = body.hits?.hits ?? [];
	const total = body.hits?.total;
	let totalValue = hits.length;
	let relation: string | undefined;

	if (typeof total === 'number') {
		totalValue = total;
	} else if (typeof total === 'object' && total !== null) {
		totalValue = Number(total.value ?? hits.length);
		relation = total.relation;
	}

	return {
		items: hits.map((hit) => ({
			index: hit._index,
			id: hit._id,
			score: hit._score,
			source: hit._source,
			fields: hit.fields,
			sort: hit.sort,
		})),
		total: totalValue,
		relation,
		took: body.took,
		timedOut: body.timed_out,
		shards: body._shards,
	};
}

export function getSingleAffectedItem(
	this: IExecuteFunctions,
	responseBody: IDataObject,
	itemIndex: number,
	entityName: string,
	entityId: string,
): IDataObject {
	const collection = normalizeWazuhCollection(responseBody);
	const item = collection.items[0];

	if (item === undefined) {
		throw new NodeOperationError(this.getNode(), `${entityName} "${entityId}" was not found`, {
			itemIndex,
		});
	}

	return {
		...item,
		_metadata: {
			message: collection.message,
			total: collection.total,
			totalFailed: collection.totalFailed,
			failedItems: collection.failedItems,
		},
	};
}
