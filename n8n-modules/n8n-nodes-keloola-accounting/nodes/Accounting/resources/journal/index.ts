import { INodeProperties } from 'n8n-workflow';

export const resources = {
  journal: {
    name: 'Journal',
    value: 'journal',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get many journal entries',
    description: 'Get all journal entries',
  },
  create: {
    name: 'Create',
    value: 'create',
    action: 'Create a journal entry',
    description: 'Create a new journal entry',
  },
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get a journal entry',
    description: 'Get a journal entry by ID',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update a journal entry',
    description: 'Update a journal entry',
  },
  delete: {
    name: 'Delete',
    value: 'delete',
    action: 'Delete a journal entry',
    description: 'Delete a journal entry',
  },
};

const showOnlyForJournal = {
  resource: [resources.journal.value],
};

export const journalNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForJournal,
    },
    options: [...Object.values(operations)],
    default: operations.getAll.value,
  },
  {
    displayName: 'Page',
    name: 'page',
    type: 'number',
    default: 1,
    displayOptions: {
      show: {
        resource: [resources.journal.value],
        operation: [operations.getAll.value],
      },
    },
    description: 'The page number to retrieve',
  },
  {
    displayName: 'Per Page',
    name: 'per_page',
    type: 'number',
    default: 15,
    displayOptions: {
      show: {
        resource: [resources.journal.value],
        operation: [operations.getAll.value],
      },
    },
    description: 'The number of items to retrieve per page',
  },
  {
    displayName: 'Search',
    name: 'search',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.journal.value],
        operation: [operations.getAll.value],
      },
    },
    description: 'Search string',
  },
  {
    displayName: 'Sort',
    name: 'sort',
    type: 'options',
    default: 'desc',
    options: [
      { name: 'Ascending', value: 'asc' },
      { name: 'Descending', value: 'desc' },
    ],
    displayOptions: {
      show: {
        resource: [resources.journal.value],
        operation: [operations.getAll.value],
      },
    },
    description: 'Sort order',
  },
  {
    displayName: 'ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.journal.value],
        operation: [operations.get.value, operations.update.value, operations.delete.value],
      },
    },
    description: 'The ID of the journal entry',
  },
  {
    displayName: 'Transaction Number',
    name: 'transaction_number',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.journal.value],
        operation: [operations.create.value],
      },
    },
    description: 'Transaction number (optional for create)',
  },
  {
    displayName: 'Transaction Number',
    name: 'transaction_number',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.journal.value],
        operation: [operations.update.value],
      },
    },
    description: 'Transaction number (required for update)',
  },
  {
    displayName: 'Date',
    name: 'date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.journal.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The date of the journal entry',
  },
  {
    displayName: 'Reference',
    name: 'reference',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.journal.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Reference for the journal entry',
  },
  {
    displayName: 'Force Posting',
    name: 'force_posting',
    type: 'boolean',
    default: true,
    displayOptions: {
      show: {
        resource: [resources.journal.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Whether to force posting of the journal entry',
  },
  {
    displayName: 'Currency Name or ID',
    name: 'currency',
    type: 'options',
    default: '',
    typeOptions: {
      loadOptionsMethod: 'getCurrencies',
    },
    displayOptions: {
      show: {
        resource: [resources.journal.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description:
      'Currency for the journal entry. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.journal.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Description of the journal entry',
  },
  {
    displayName: 'Details',
    name: 'details',
    placeholder: 'Add Detail',
    type: 'fixedCollection',
    default: {},
    typeOptions: {
      multipleValues: true,
    },
    displayOptions: {
      show: {
        resource: [resources.journal.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Journal entry details',
    options: [
      {
        name: 'detail_item',
        displayName: 'Detail Item',
        values: [
          {
            displayName: 'Account ID',
            name: 'account_id',
            type: 'string',
            required: true,
            default: '',
          },
          {
            displayName: 'Description',
            name: 'description',
            type: 'string',
            default: '',
            description: 'Description for this detail line',
          },
          {
            displayName: 'Debit',
            name: 'debit',
            type: 'number',
            required: true,
            default: 0,
            description: 'Debit amount',
          },
          {
            displayName: 'Credit',
            name: 'credit',
            type: 'number',
            required: true,
            default: 0,
            description: 'Credit amount',
          },
        ],
      },
    ],
  },
];

export { router } from './router';
