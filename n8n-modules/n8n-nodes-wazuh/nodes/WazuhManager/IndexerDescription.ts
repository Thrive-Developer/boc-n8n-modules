import type { INodeProperties } from 'n8n-workflow';

const showOnlyForIndexerQuery = {
	'@version': [2],
	resource: ['indexer'],
	operation: ['query'],
};

export const indexerDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['indexer'],
			},
		},
		options: [
			{
				name: 'Query',
				value: 'query',
				description: 'Run an arbitrary search query against a Wazuh Indexer index pattern',
				action: 'Query the indexer',
			},
		],
		default: 'query',
	},
	{
		displayName: 'Method',
		name: 'method',
		type: 'options',
		default: 'POST',
		displayOptions: {
			show: showOnlyForIndexerQuery,
		},
		options: [
			{
				name: 'GET',
				value: 'GET',
			},
			{
				name: 'POST',
				value: 'POST',
			},
		],
		description: 'HTTP method for the index _search request',
	},
	{
		displayName: 'Index Pattern',
		name: 'index',
		type: 'string',
		default: 'wazuh-alerts*',
		required: true,
		displayOptions: {
			show: showOnlyForIndexerQuery,
		},
		description: 'Wazuh Indexer index name or pattern to query',
	},
	{
		displayName: 'Query JSON',
		name: 'queryBody',
		type: 'json',
		default: '{"query":{"match_all":{}}}',
		displayOptions: {
			show: showOnlyForIndexerQuery,
		},
		description: 'OpenSearch query DSL body to send to the index _search endpoint',
	},
];
