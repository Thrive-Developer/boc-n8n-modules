import { INodeProperties } from 'n8n-workflow';

export const resources = {
  chartOfAccount: {
    name: 'Chart of Account',
    value: 'chartOfAccount',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get many chart of accounts',
    description: 'Get all chart of accounts',
  },
  getTypes: {
    name: 'Get Types',
    value: 'getTypes',
    action: 'Get chart of account types',
    description: 'Get all chart of account types',
  },
  create: {
    name: 'Create',
    value: 'create',
    action: 'Create a chart of account',
    description: 'Create a new chart of account',
  },
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get a chart of account',
    description: 'Get a chart of account by ID',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update a chart of account',
    description: 'Update a chart of account',
  },
  delete: {
    name: 'Delete',
    value: 'delete',
    action: 'Delete a chart of account',
    description: 'Delete a chart of account',
  },
};

const showOnlyForChartOfAccount = {
  resource: [resources.chartOfAccount.value],
};

export const chartOfAccountNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForChartOfAccount,
    },
    options: [...Object.values(operations)],
    default: operations.getAll.value,
  },
  {
    displayName: 'Page',
    name: 'page',
    type: 'number',
    required: true,
    default: 1,
    displayOptions: {
      show: {
        resource: [resources.chartOfAccount.value],
        operation: [operations.getAll.value],
      },
    },
    description: 'The page number for pagination',
  },
  {
    displayName: 'Search',
    name: 'search',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.chartOfAccount.value],
        operation: [operations.getAll.value],
      },
    },
    description: 'Search Chart of Account',
  },
  {
    displayName: 'ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.chartOfAccount.value],
        operation: [operations.get.value, operations.update.value, operations.delete.value],
      },
    },
    description: 'The ID of the chart of account',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.chartOfAccount.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The name of the chart of account',
  },
  {
    displayName: 'Code',
    name: 'code',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: [resources.chartOfAccount.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The code of the chart of account',
  },
  {
    displayName: 'Type ID',
    name: 'type',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.chartOfAccount.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The type ID of the chart of account (UUID)',
  },
  {
    displayName: 'Tax ID',
    name: 'tax',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.chartOfAccount.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The tax ID of the chart of account (UUID)',
  },
  {
    displayName: 'Details',
    name: 'details',
    type: 'options',
    options: [
      {
        name: 'None (Empty)',
        value: '',
      },
      {
        name: 'Sub Account',
        value: 'sub_account',
      },
    ],
    default: '',
    displayOptions: {
      show: {
        resource: [resources.chartOfAccount.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The detail type of the chart of account',
  },
  {
    displayName: 'Parent Account ID',
    name: 'account',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.chartOfAccount.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The parent account ID (UUID)',
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.chartOfAccount.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The description of the chart of account',
  },
  {
    displayName: 'Currency ID',
    name: 'currency',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.chartOfAccount.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The currency ID (UUID)',
  },
  {
    displayName: 'Is Enabled',
    name: 'isEnable',
    type: 'boolean',
    default: true,
    displayOptions: {
      show: {
        resource: [resources.chartOfAccount.value],
        operation: [operations.update.value],
      },
    },
    description: 'Whether the chart of account is enabled',
  },
];

export { router } from './router';
