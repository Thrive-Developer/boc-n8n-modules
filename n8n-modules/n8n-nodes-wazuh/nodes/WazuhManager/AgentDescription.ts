import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAgentList = {
	'@version': [2],
	resource: ['agent'],
	operation: ['list'],
};

const showOnlyForAgentRestart = {
	'@version': [2],
	resource: ['agent'],
	operation: ['restart'],
};

export const agentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['agent'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get one Wazuh agent by ID',
				action: 'Get an agent',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List Wazuh agents',
				action: 'List agents',
			},
			{
				name: 'Restart',
				value: 'restart',
				description: 'Restart one Wazuh agent',
				action: 'Restart an agent',
			},
		],
		default: 'list',
	},
	{
		displayName: 'Agent ID',
		name: 'agentId',
		type: 'string',
		default: '',
		required: true,
		placeholder: '001',
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['agent'],
				operation: ['get', 'restart'],
			},
		},
		description: 'ID of the Wazuh agent',
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		default: '',
		displayOptions: {
			show: showOnlyForAgentList,
		},
		options: [
			{
				name: 'Active',
				value: 'active',
			},
			{
				name: 'Any',
				value: '',
			},
			{
				name: 'Disconnected',
				value: 'disconnected',
			},
			{
				name: 'Never Connected',
				value: 'never_connected',
			},
			{
				name: 'Pending',
				value: 'pending',
			},
		],
		description: 'Filter agents by connection status',
	},
	{
		displayName: 'Select',
		name: 'select',
		type: 'string',
		default: '',
		placeholder: 'id,name,ip,status,version',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['get', 'list'],
			},
		},
		description: 'Comma-separated response fields to return',
	},
	{
		displayName: 'Search',
		name: 'search',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForAgentList,
		},
		description: 'Text to search for in agent fields',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		displayOptions: {
			show: showOnlyForAgentList,
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		default: 0,
		displayOptions: {
			show: showOnlyForAgentList,
		},
		description: 'Number of agents to skip',
	},
	{
		displayName: 'Wait for Complete',
		name: 'waitForComplete',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForAgentRestart,
		},
		description: 'Whether to disable the Wazuh API timeout response',
	},
];
