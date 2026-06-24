import type { INodeProperties } from 'n8n-workflow';

const showOnlyForDecoderList = {
	resource: ['decoder'],
	operation: ['list'],
};

export const decoderDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['decoder'],
			},
		},
		options: [
			{
				name: 'List',
				value: 'list',
				description: 'List Wazuh ruleset decoders',
				action: 'List decoders',
			},
		],
		default: 'list',
	},
	{
		displayName: 'Name',
		name: 'decoderName',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForDecoderList,
		},
		description: 'Decoder name to filter by',
	},
	{
		displayName: 'Filename',
		name: 'filename',
		type: 'string',
		default: '',
		placeholder: '0005-wazuh_decoders.xml',
		displayOptions: {
			show: showOnlyForDecoderList,
		},
		description: 'Decoder XML filename to filter by',
	},
	{
		displayName: 'Relative Directory',
		name: 'relativeDirname',
		type: 'string',
		default: '',
		placeholder: 'ruleset/decoders',
		displayOptions: {
			show: showOnlyForDecoderList,
		},
		description: 'Relative decoder directory to filter by',
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		default: '',
		displayOptions: {
			show: showOnlyForDecoderList,
		},
		options: [
			{
				name: 'Any',
				value: '',
			},
			{
				name: 'All',
				value: 'all',
			},
			{
				name: 'Disabled',
				value: 'disabled',
			},
			{
				name: 'Enabled',
				value: 'enabled',
			},
		],
		description: 'Filter decoder files by status',
	},
	{
		displayName: 'Search',
		name: 'search',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForDecoderList,
		},
		description: 'Text to search for in decoder fields',
	},
	{
		displayName: 'Select',
		name: 'select',
		type: 'string',
		default: '',
		placeholder: 'name,filename,relative_dirname,status',
		displayOptions: {
			show: showOnlyForDecoderList,
		},
		description: 'Comma-separated response fields to return',
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
			show: showOnlyForDecoderList,
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
			show: showOnlyForDecoderList,
		},
		description: 'Number of decoders to skip',
	},
];
