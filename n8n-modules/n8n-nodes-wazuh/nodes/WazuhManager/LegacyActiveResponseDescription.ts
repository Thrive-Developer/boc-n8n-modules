import type { INodeProperties } from 'n8n-workflow';

const showOnlyForLegacyActiveResponse = {
	'@version': [1],
};

export const legacyActiveResponseDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForLegacyActiveResponse,
		},
		options: [
			{
				name: 'Run Command',
				value: 'runCommand',
				description: 'Execute an Active Response command on one or more Wazuh agents',
				action: 'Run an active response command',
			},
		],
		default: 'runCommand',
	},
	{
		displayName: 'Command',
		name: 'command',
		type: 'string',
		default: '',
		required: true,
		placeholder: '!firewall-drop',
		displayOptions: {
			show: showOnlyForLegacyActiveResponse,
		},
		description: 'Active Response command name',
	},
	{
		displayName: 'Agents',
		name: 'agents',
		type: 'string',
		default: '',
		placeholder: '001,002,003',
		displayOptions: {
			show: showOnlyForLegacyActiveResponse,
		},
		description:
			'Comma-separated list of agent IDs. Leave empty to run the command on all agents.',
	},
	{
		displayName: 'Arguments',
		name: 'arguments',
		type: 'string',
		default: '',
		placeholder: '1.2.3.4',
		displayOptions: {
			show: showOnlyForLegacyActiveResponse,
		},
		description: 'Comma-separated arguments passed to the command',
	},
	{
		displayName: 'Alert Data',
		name: 'alertData',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: showOnlyForLegacyActiveResponse,
		},
		description: 'Alert data object sent as alert.data in the Wazuh Active Response request',
	},
	{
		displayName: 'Wait for Complete',
		name: 'waitForComplete',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForLegacyActiveResponse,
		},
		description: 'Whether to disable the Wazuh API timeout response',
	},
];
