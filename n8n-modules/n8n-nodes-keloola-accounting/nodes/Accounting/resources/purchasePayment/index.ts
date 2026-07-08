import { INodeProperties } from 'n8n-workflow';

export const resources = {
  purchasePayment: {
    name: 'Purchase Payment',
    value: 'purchasePayment',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get many purchase payments',
    description: 'Get all purchase payments',
  },
  create: {
    name: 'Create',
    value: 'create',
    action: 'Create a purchase payment',
    description: 'Create a new purchase payment',
  },
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get a purchase payment',
    description: 'Get a purchase payment by ID',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update a purchase payment',
    description: 'Update a purchase payment',
  },
  delete: {
    name: 'Delete',
    value: 'delete',
    action: 'Delete a purchase payment',
    description: 'Delete a purchase payment',
  },
  print: {
    name: 'Print',
    value: 'print',
    action: 'Print purchase payment',
    description: 'Print purchase payment',
  },
};

const showOnlyForPurchasePayment = {
  resource: [resources.purchasePayment.value],
};

export const purchasePaymentNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForPurchasePayment,
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
        ...showOnlyForPurchasePayment,
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
        ...showOnlyForPurchasePayment,
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
        ...showOnlyForPurchasePayment,
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
        ...showOnlyForPurchasePayment,
        operation: [operations.getAll.value],
      },
    },
  },
  // ----------------------------------
  //         get, update, delete, print
  // ----------------------------------
  {
    displayName: 'ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchasePayment,
        operation: [
          operations.get.value,
          operations.update.value,
          operations.delete.value,
          operations.print.value,
        ],
      },
    },
    description: 'The ID of the purchase payment',
  },
  // ----------------------------------
  //         create, update
  // ----------------------------------
  {
    displayName: 'Vendor Name or ID',
    name: 'vendor',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getContacts',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchasePayment,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description:
      'The vendor whom you are paying. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Pay From Name or ID',
    name: 'pay_from',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getBankAccounts',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchasePayment,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description:
      'The bank or cash account from which the payment is made. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Invoice From ID',
    name: 'invoice_from',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchasePayment,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Main Purchase Invoice ID related to this payment',
  },
  {
    displayName: 'Invoice Date',
    name: 'invoice_date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchasePayment,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Format: YYYY-MM-DD',
  },
  {
    displayName: 'Payment Date',
    name: 'payment_date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchasePayment,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The date when the payment was made. Format: YYYY-MM-DD.',
  },
  {
    displayName: 'Due Date',
    name: 'due_date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchasePayment,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Format: YYYY-MM-DD',
  },
  {
    displayName: 'Currency Name or ID',
    name: 'currency',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getCurrencies',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchasePayment,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description:
      'The currency of the payment. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Invoices',
    name: 'invoices',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    displayOptions: {
      show: {
        ...showOnlyForPurchasePayment,
        operation: [operations.create.value, operations.update.value],
      },
    },
    options: [
      {
        displayName: 'Item',
        name: 'item',
        values: [
          {
            displayName: 'Invoice ID',
            name: 'invoice_id',
            type: 'string',
            default: '',
            required: true,
          },
          {
            displayName: 'Amount',
            name: 'amount',
            type: 'number',
            default: 0,
            required: true,
          },
        ],
      },
    ],
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        ...showOnlyForPurchasePayment,
        operation: [operations.create.value, operations.update.value],
      },
    },
    options: [
      {
        displayName: 'Transaction No',
        name: 'transaction_no',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Payment Method',
        name: 'payment_method',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Memo',
        name: 'memo',
        type: 'string',
        default: '',
      },
    ],
  },
  // ----------------------------------
  //         print
  // ----------------------------------
  {
    displayName: 'Template',
    name: 'template',
    type: 'options',
    options: [
      { name: 'Template 1', value: 'template-1' },
      { name: 'Template 2', value: 'template-2' },
    ],
    default: 'template-1',
    displayOptions: {
      show: {
        ...showOnlyForPurchasePayment,
        operation: [operations.print.value],
      },
    },
    description: 'Print template',
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
        ...showOnlyForPurchasePayment,
        operation: [operations.print.value],
      },
    },
  },
];

export { router } from './router';
