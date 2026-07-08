import { INodeProperties } from 'n8n-workflow';

export const resources = {
  salesDownPayment: {
    name: 'Sales Down Payment',
    value: 'salesDownPayment',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get many sales down payments',
    description: 'Get all sales down payments',
  },
  create: {
    name: 'Create',
    value: 'create',
    action: 'Create a sales down payment',
    description: 'Create a new sales down payment',
  },
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get a sales down payment',
    description: 'Get a sales down payment by ID',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update a sales down payment',
    description: 'Update a sales down payment',
  },
  delete: {
    name: 'Delete',
    value: 'delete',
    action: 'Delete a sales down payment',
    description: 'Delete a sales down payment',
  },
  record: {
    name: 'Record Payment',
    value: 'record',
    action: 'Record a payment for sales down payment',
    description: 'Record a payment for sales down payment',
  },
  send: {
    name: 'Send Mail',
    value: 'send',
    action: 'Send mail sales down payment',
    description: 'Send mail sales down payment',
  },
  print: {
    name: 'Print',
    value: 'print',
    action: 'Print sales down payment',
    description: 'Print sales down payment',
  },
};

const showOnlyForSalesDownPayment = {
  resource: [resources.salesDownPayment.value],
};

export const salesDownPaymentNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForSalesDownPayment,
    },
    options: [...Object.values(operations)],
    default: operations.getAll.value,
  },
  // ----------------------------------
  //         getAll
  // ----------------------------------
  {
    displayName: 'Page',
    name: 'page',
    type: 'number',
    default: 1,
    displayOptions: {
      show: {
        ...showOnlyForSalesDownPayment,
        operation: [operations.getAll.value],
      },
    },
    description: 'Page number',
  },
  {
    displayName: 'Per Page',
    name: 'per_page',
    type: 'number',
    default: 15,
    displayOptions: {
      show: {
        ...showOnlyForSalesDownPayment,
        operation: [operations.getAll.value],
      },
    },
    description: 'Number of items per page',
  },
  {
    displayName: 'Search',
    name: 'search',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForSalesDownPayment,
        operation: [operations.getAll.value],
      },
    },
    description: 'Search by keyword',
  },
  {
    displayName: 'Sort',
    name: 'sort',
    type: 'options',
    options: [
      { name: 'ASC', value: 'asc' },
      { name: 'DESC', value: 'desc' },
    ],
    default: 'desc',
    displayOptions: {
      show: {
        ...showOnlyForSalesDownPayment,
        operation: [operations.getAll.value],
      },
    },
  },
  // ----------------------------------
  //         get, update, delete, record, send, print
  // ----------------------------------
  {
    displayName: 'ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForSalesDownPayment,
        operation: [
          operations.get.value,
          operations.update.value,
          operations.delete.value,
          operations.record.value,
          operations.send.value,
          operations.print.value,
        ],
      },
    },
    description: 'The ID of the sales down payment',
  },
  // ----------------------------------
  //         create
  // ----------------------------------
  {
    displayName: 'Sale Order ID',
    name: 'sale_order_id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForSalesDownPayment,
        operation: [operations.create.value],
      },
    },
    description: 'The ID of the sale order',
  },
  // ----------------------------------
  //         create, update
  // ----------------------------------
  {
    displayName: 'Due Date',
    name: 'due_date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForSalesDownPayment,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Format: YYYY-MM-DD',
  },
  {
    displayName: 'Amount',
    name: 'amount',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        ...showOnlyForSalesDownPayment,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The amount of down payment',
  },
  // ----------------------------------
  //         record
  // ----------------------------------
  {
    displayName: 'Deposit To Name or ID',
    name: 'deposit_to',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getBankAccounts',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForSalesDownPayment,
        operation: [operations.record.value],
      },
    },
    description:
      'The bank or cash account where the payment is deposited. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Transaction Date',
    name: 'transaction_date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForSalesDownPayment,
        operation: [operations.record.value],
      },
    },
    description: 'Format: YYYY-MM-DD',
  },
  {
    displayName: 'Payment Method',
    name: 'payment_method',
    type: 'options',
    options: [
      { name: 'Cash', value: 'cash' },
      { name: 'Bank Transfer', value: 'bank_transfer' },
      { name: 'Credit Card', value: 'credit_card' },
    ],
    required: true,
    default: 'cash',
    displayOptions: {
      show: {
        ...showOnlyForSalesDownPayment,
        operation: [operations.record.value],
      },
    },
  },
  {
    displayName: 'Payment Proof',
    name: 'payment_proof',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForSalesDownPayment,
        operation: [operations.record.value],
      },
    },
    description: 'The proof of payment',
  },
  // ----------------------------------
  //         send
  // ----------------------------------
  {
    displayName: 'To',
    name: 'to',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForSalesDownPayment,
        operation: [operations.send.value],
      },
    },
    description: 'The recipient email addresses, comma-separated',
  },
  {
    displayName: 'Template',
    name: 'template',
    type: 'options',
    options: [
      { name: 'Template 1', value: 'template-1' },
      { name: 'Template 2', value: 'template-2' },
    ],
    required: true,
    default: 'template-1',
    displayOptions: {
      show: {
        ...showOnlyForSalesDownPayment,
        operation: [operations.send.value],
      },
    },
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        ...showOnlyForSalesDownPayment,
        operation: [operations.send.value],
      },
    },
    options: [
      {
        displayName: 'CC',
        name: 'cc',
        type: 'string',
        default: '',
        description: 'The CC email addresses, comma-separated',
      },
      {
        displayName: 'Message',
        name: 'message',
        type: 'string',
        default: '',
      },
    ],
  },
  // ----------------------------------
  //         print
  // ----------------------------------
  {
    displayName: 'Print Template',
    name: 'template_print',
    type: 'options',
    options: [
      { name: 'Template 1', value: 'template-1' },
      { name: 'Template 2', value: 'template-2' },
    ],
    default: 'template-1',
    displayOptions: {
      show: {
        ...showOnlyForSalesDownPayment,
        operation: [operations.print.value],
      },
    },
  },
  {
    displayName: 'Preview Type',
    name: 'preview_type',
    type: 'options',
    options: [
      { name: 'PDF', value: 'pdf' },
      { name: 'HTML', value: 'html' },
    ],
    default: 'pdf',
    displayOptions: {
      show: {
        ...showOnlyForSalesDownPayment,
        operation: [operations.print.value],
      },
    },
  },
];

export { router } from './router';
