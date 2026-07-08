import { INodeProperties } from 'n8n-workflow';

export const resources = {
  exchange: {
    name: 'Exchange Currency',
    value: 'exchange',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get all currencies',
    description: 'Get all available currencies',
  },
};

export const exchangeNode: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    options: [
      {
        name: 'Get Many',
        value: 'getAll',
        action: 'Get many an exchange',
      },
    ],
    default: 'getAll',
    displayOptions: {
      show: {
        resource: ['exchange'],
      },
    },
  },
  {
    displayName: 'Per Page',
    name: 'per_page',
    type: 'number',
    default: 15,
    displayOptions: {
      show: {
        resource: [resources.exchange.value],
        operation: [operations.getAll.value],
      },
    },
    description: 'The number of items to retrieve per page',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: [resources.exchange.value],
        operation: [operations.getAll.value],
      },
    },
    options: [
      {
        displayName: 'Exclude Base',
        name: 'exclude_base',
        type: 'boolean',
        default: false,
        description: 'Whether to exclude the base currency from the list',
      },
    ],
  },
];

export { router } from './router';
