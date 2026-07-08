import { INodeProperties } from 'n8n-workflow';

export const resources = {
  purchaseReturn: {
    name: 'Purchase Return',
    value: 'purchaseReturn',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get many purchase returns',
    description: 'Get all purchase returns',
  },
  create: {
    name: 'Create',
    value: 'create',
    action: 'Create a purchase return',
    description: 'Create a new purchase return',
  },
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get a purchase return',
    description: 'Get a purchase return by ID',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update a purchase return',
    description: 'Update a purchase return',
  },
  delete: {
    name: 'Delete',
    value: 'delete',
    action: 'Delete a purchase return',
    description: 'Delete a purchase return',
  },
  print: {
    name: 'Print',
    value: 'print',
    action: 'Print purchase return',
    description: 'Print purchase return',
  },
  send: {
    name: 'Send',
    value: 'send',
    action: 'Send mail purchase return',
    description: 'Send purchase return via email',
  },
};

const showOnlyForPurchaseReturn = {
  resource: [resources.purchaseReturn.value],
};

export const purchaseReturnNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForPurchaseReturn,
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
        ...showOnlyForPurchaseReturn,
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
        ...showOnlyForPurchaseReturn,
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
        ...showOnlyForPurchaseReturn,
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
        ...showOnlyForPurchaseReturn,
        operation: [operations.getAll.value],
      },
    },
  },
  // ----------------------------------
  //         get, update, delete, print, send
  // ----------------------------------
  {
    displayName: 'ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseReturn,
        operation: [
          operations.get.value,
          operations.update.value,
          operations.delete.value,
          operations.print.value,
          operations.send.value,
        ],
      },
    },
    description: 'The ID of the purchase return',
  },
  // ----------------------------------
  //         create, update
  // ----------------------------------
  {
    displayName: 'Invoice ID',
    name: 'invoice_id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseReturn,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Purchase Invoice ID',
  },
  {
    displayName: 'Return Date',
    name: 'return_date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseReturn,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Return Date (Format: YYYY-MM-DD)',
  },
  {
    displayName: 'Products',
    name: 'products',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    displayOptions: {
      show: {
        ...showOnlyForPurchaseReturn,
        operation: [operations.create.value, operations.update.value],
      },
    },
    options: [
      {
        displayName: 'Item',
        name: 'item',
        values: [
          {
            displayName: 'Product ID',
            name: 'product_id',
            type: 'string',
            default: '',
            required: true,
          },
          {
            displayName: 'Return Quantity',
            name: 'return_quantity',
            type: 'number',
            default: 1,
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
        ...showOnlyForPurchaseReturn,
        operation: [operations.create.value, operations.update.value],
      },
    },
    options: [
      {
        displayName: 'Return No',
        name: 'return_no',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Message',
        name: 'messsage',
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
        ...showOnlyForPurchaseReturn,
        operation: [operations.send.value],
      },
    },
    description: 'Email recipients (comma-separated)',
  },
  {
    displayName: 'CC',
    name: 'cc',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseReturn,
        operation: [operations.send.value],
      },
    },
    description: 'Email CC recipients (comma-separated)',
  },
  {
    displayName: 'Message',
    name: 'message',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseReturn,
        operation: [operations.send.value],
      },
    },
    description: 'Email body',
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
        ...showOnlyForPurchaseReturn,
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
        ...showOnlyForPurchaseReturn,
        operation: [operations.print.value],
      },
    },
  },
];

export { router } from './router';
