import type { INodeProperties } from 'n8n-workflow';

export const resources = {
  bankExpense: {
    name: 'Bank Expense',
    value: 'bankExpense',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get many bank expenses',
    description: 'Get all bank expenses',
  },
  create: {
    name: 'Create',
    value: 'create',
    action: 'Create a bank expense',
    description: 'Create a new bank expense',
  },
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get a bank expense',
    description: 'Get a bank expense by ID',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update a bank expense',
    description: 'Update a bank expense',
  },
  delete: {
    name: 'Delete',
    value: 'delete',
    action: 'Delete a bank expense',
    description: 'Delete a bank expense',
  },
};

const showOnlyForBankExpense = {
  resource: [resources.bankExpense.value],
};

export const bankExpenseNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForBankExpense,
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
        resource: [resources.bankExpense.value],
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
        resource: [resources.bankExpense.value],
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
        resource: [resources.bankExpense.value],
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
        resource: [resources.bankExpense.value],
        operation: [operations.get.value, operations.update.value, operations.delete.value],
      },
    },
    description: 'The ID of the bank expense',
  },
  {
    displayName: 'Type',
    name: 'type',
    type: 'options',
    options: [
      {
        name: 'Expense',
        value: 'expense',
      },
      {
        name: 'Down Payment',
        value: 'down_payment',
      },
    ],
    required: true,
    default: 'expense',
    displayOptions: {
      show: {
        resource: [resources.bankExpense.value],
        operation: [operations.create.value],
      },
    },
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
        resource: [resources.bankExpense.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description:
      'The bank account from which the expense is paid. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'To Account Name or ID',
    name: 'to',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getAccounts',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.bankExpense.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description:
      'The chart of account to which the expense is allocated. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Recipient Name or ID',
    name: 'recipient',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getContacts',
    },
    default: '',
    displayOptions: {
      show: {
        resource: [resources.bankExpense.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description:
      'The contact who received the payment. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Date',
    name: 'date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.bankExpense.value],
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
        resource: [resources.bankExpense.value],
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
        resource: [resources.bankExpense.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The ID of the currency for the transaction',
  },
  {
    displayName: 'Tax ID',
    name: 'tax_id',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.bankExpense.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The ID of the tax for the transaction',
  },
  {
    displayName: 'Transaction Number',
    name: 'transaction_number',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.bankExpense.value],
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
        resource: [resources.bankExpense.value],
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
        resource: [resources.bankExpense.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
  },
];

export { router } from './router';
