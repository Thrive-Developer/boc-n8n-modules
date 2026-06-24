import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSecurityEventSearchAlerts = {
	'@version': [2],
	resource: ['securityEvent'],
	operation: ['searchAlerts'],
};

export const securityEventDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['securityEvent'],
			},
		},
		options: [
			{
				name: 'Search Alerts',
				value: 'searchAlerts',
				description: 'Search Wazuh alert documents in the indexer',
				action: 'Search alerts',
			},
		],
		default: 'searchAlerts',
	},
	{
		displayName: 'Index Pattern',
		name: 'index',
		type: 'string',
		default: 'wazuh-alerts*',
		required: true,
		displayOptions: {
			show: showOnlyForSecurityEventSearchAlerts,
		},
		description: 'Wazuh Indexer alert index pattern',
	},
	{
		displayName: 'Query Mode',
		name: 'queryMode',
		type: 'options',
		options: [
			{
				name: 'Build From Fields',
				value: 'build',
			},
			{
				name: 'Use Query DSL',
				value: 'dsl',
			},
		],
		default: 'build',
		displayOptions: {
			show: showOnlyForSecurityEventSearchAlerts,
		},
		description: 'How to build the Wazuh Indexer search body',
	},
	{
		displayName: 'Query JSON',
		name: 'queryBody',
		type: 'json',
		default: '{"query":{"match_all":{}}}',
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['securityEvent'],
				operation: ['searchAlerts'],
				queryMode: ['dsl'],
			},
		},
		description: 'OpenSearch query DSL body to send to the Wazuh Indexer',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['securityEvent'],
				operation: ['searchAlerts'],
				queryMode: ['build'],
			},
		},
		options: [
			{
				displayName: 'Agent ID',
				name: 'agentId',
				type: 'string',
				default: '',
				placeholder: '001',
				description: 'Filter by agent.ID',
			},
			{
				displayName: 'Max Rule Level',
				name: 'maxRuleLevel',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 15,
				description: 'Maximum rule.level value',
			},
			{
				displayName: 'Min Rule Level',
				name: 'minRuleLevel',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Minimum rule.level value',
			},
			{
				displayName: 'Query String',
				name: 'queryString',
				type: 'string',
				default: '',
				placeholder: 'rule.groups:authentication_failed',
				description: 'OpenSearch query_string expression',
			},
			{
				displayName: 'Rule ID',
				name: 'ruleId',
				type: 'string',
				default: '',
				placeholder: '5710',
				description: 'Filter by rule.ID',
			},
			{
				displayName: 'Timestamp From',
				name: 'timestampFrom',
				type: 'string',
				default: '',
				placeholder: 'now-24h',
				description: 'Lower bound for @timestamp',
			},
			{
				displayName: 'Timestamp To',
				name: 'timestampTo',
				type: 'string',
				default: '',
				placeholder: 'now',
				description: 'Upper bound for @timestamp',
			},
		],
	},
	{
		displayName: 'Size',
		name: 'size',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: showOnlyForSecurityEventSearchAlerts,
		},
		description: 'Maximum number of matching alerts to return',
	},
	{
		displayName: 'From',
		name: 'from',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		default: 0,
		displayOptions: {
			show: showOnlyForSecurityEventSearchAlerts,
		},
		description: 'Number of matching alerts to skip',
	},
	{
		displayName: 'Sort Field',
		name: 'sortField',
		type: 'string',
		default: '@timestamp',
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['securityEvent'],
				operation: ['searchAlerts'],
				queryMode: ['build'],
			},
		},
		description: 'Field to sort by',
	},
	{
		displayName: 'Sort Order',
		name: 'sortOrder',
		type: 'options',
		default: 'desc',
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['securityEvent'],
				operation: ['searchAlerts'],
				queryMode: ['build'],
			},
		},
		options: [
			{
				name: 'Ascending',
				value: 'asc',
			},
			{
				name: 'Descending',
				value: 'desc',
			},
		],
		description: 'Sort order for matching alerts',
	},
];
