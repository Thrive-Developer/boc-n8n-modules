import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRuleGet = {
	'@version': [2],
	resource: ['rule'],
	operation: ['get'],
};

export const ruleDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['rule'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get the content of a Wazuh rule file',
				action: 'Get a rule file',
			},
		],
		default: 'get',
	},
	{
		displayName: 'Filename',
		name: 'filename',
		type: 'string',
		default: '',
		required: true,
		placeholder: '0010-rules_config.xml',
		displayOptions: {
			show: showOnlyForRuleGet,
		},
		description: 'Rule XML filename to retrieve',
	},
	{
		displayName: 'Relative Directory',
		name: 'relativeDirname',
		type: 'string',
		default: 'ruleset/rules',
		placeholder: 'ruleset/rules',
		displayOptions: {
			show: showOnlyForRuleGet,
		},
		description: 'Relative directory that contains the rule file',
	},
];
