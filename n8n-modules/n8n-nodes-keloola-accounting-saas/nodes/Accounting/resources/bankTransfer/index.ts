import type { INodeProperties } from 'n8n-workflow';

export const resources = {
  bankTransfer: {
    name: 'Bank Transfer',
    value: 'bankTransfer',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get many bank transfers',
    description: 'Get all bank transfers',
  },
  create: {
    name: 'Create',
    value: 'create',
    action: 'Create a bank transfer',
    description: 'Create a new bank transfer',
  },
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get a bank transfer',
    description: 'Get a bank transfer by ID',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update a bank transfer',
    description: 'Update a bank transfer',
  },
  delete: {
    name: 'Delete',
    value: 'delete',
    action: 'Delete a bank transfer',
    description: 'Delete a bank transfer',
  },
};

const showOnlyForBankTransfer = {
  resource: [resources.bankTransfer.value],
};

export const bankTransferNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForBankTransfer,
    },
    options: [...Object.values(operations)],
    default: operations.getAll.value,
  },
  {
    displayName: 'Bank Account Name or ID',
    name: 'bankAccountId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getBankAccounts',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.bankTransfer.value],
        operation: [operations.getAll.value],
      },
    },
    description:
      'The bank account to get transactions for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Page',
    name: 'page',
    type: 'number',
    default: 1,
    displayOptions: {
      show: {
        resource: [resources.bankTransfer.value],
        operation: [operations.getAll.value],
      },
    },
    description: 'Page number for pagination',
  },
  {
    displayName: 'Sort',
    name: 'sort',
    type: 'options',
    options: [
      { name: 'Ascending', value: 'asc' },
      { name: 'Descending', value: 'desc' },
    ],
    default: 'desc',
    displayOptions: {
      show: {
        resource: [resources.bankTransfer.value],
        operation: [operations.getAll.value],
      },
    },
    description: 'Sort order for transactions',
  },
  {
    displayName: 'ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.bankTransfer.value],
        operation: [operations.get.value, operations.update.value, operations.delete.value],
      },
    },
    description: 'The ID of the bank transfer',
  },
  {
    displayName: 'From Bank Account Name or ID',
    name: 'from',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getBankAccounts',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.bankTransfer.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description:
      'The source bank account. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'To Bank Account Name or ID',
    name: 'to',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getBankAccounts',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.bankTransfer.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description:
      'The destination bank account. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Date',
    name: 'date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.bankTransfer.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
  },
  {
    displayName: 'Amount',
    name: 'amount',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: [resources.bankTransfer.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
  },
  {
    displayName: 'Currency ID',
    name: 'currency',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.bankTransfer.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The ID of the currency for the transaction',
  },
  {
    displayName: 'Transaction Number',
    name: 'transaction_number',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.bankTransfer.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
  },
  {
    displayName: 'Reference',
    name: 'reference',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.bankTransfer.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.bankTransfer.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
  },
];

export { router } from './router';
