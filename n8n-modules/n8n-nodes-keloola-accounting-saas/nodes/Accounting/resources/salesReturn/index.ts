import { INodeProperties } from 'n8n-workflow';

export const resources = {
  salesReturn: {
    name: 'Sales Return',
    value: 'salesReturn',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get many sales returns',
    description: 'Get all sales returns',
  },
  create: {
    name: 'Create',
    value: 'create',
    action: 'Create a sales return',
    description: 'Create a new sales return',
  },
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get a sales return',
    description: 'Get a sales return by ID',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update a sales return',
    description: 'Update a sales return',
  },
  delete: {
    name: 'Delete',
    value: 'delete',
    action: 'Delete a sales return',
    description: 'Delete a sales return',
  },
  print: {
    name: 'Print',
    value: 'print',
    action: 'Print sales return',
    description: 'Print sales return',
  },
  send: {
    name: 'Send',
    value: 'send',
    action: 'Send mail sales return',
    description: 'Send sales return via email',
  },
};

const showOnlyForSalesReturn = {
  resource: [resources.salesReturn.value],
};

export const salesReturnNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForSalesReturn,
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
        ...showOnlyForSalesReturn,
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
        ...showOnlyForSalesReturn,
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
        ...showOnlyForSalesReturn,
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
        ...showOnlyForSalesReturn,
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
        ...showOnlyForSalesReturn,
        operation: [
          operations.get.value,
          operations.update.value,
          operations.delete.value,
          operations.print.value,
          operations.send.value,
        ],
      },
    },
    description: 'The ID of the sales return',
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
        ...showOnlyForSalesReturn,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Sales Invoice ID',
  },
  {
    displayName: 'Return Date',
    name: 'return_date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForSalesReturn,
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
        ...showOnlyForSalesReturn,
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
        ...showOnlyForSalesReturn,
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
        ...showOnlyForSalesReturn,
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
        ...showOnlyForSalesReturn,
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
        ...showOnlyForSalesReturn,
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
        ...showOnlyForSalesReturn,
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
        ...showOnlyForSalesReturn,
        operation: [operations.print.value],
      },
    },
  },
];

export { router } from './router';
