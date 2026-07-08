import { INodeProperties } from 'n8n-workflow';

export const resources = {
  salesOrder: {
    name: 'Sales Order',
    value: 'salesOrder',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get many sales orders',
    description: 'Get all sales orders',
  },
  create: {
    name: 'Create',
    value: 'create',
    action: 'Create a sales order',
    description: 'Create a new sales order',
  },
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get a sales order',
    description: 'Get a sales order by ID',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update a sales order',
    description: 'Update a sales order',
  },
  delete: {
    name: 'Delete',
    value: 'delete',
    action: 'Delete a sales order',
    description: 'Delete a sales order',
  },
  approve: {
    name: 'Approve',
    value: 'approve',
    action: 'Approve a sales order',
    description: 'Approve a sales order',
  },
  reject: {
    name: 'Reject',
    value: 'reject',
    action: 'Reject a sales order',
    description: 'Reject a sales order',
  },
  fulfill: {
    name: 'Fulfill',
    value: 'fulfill',
    action: 'Fulfill a sales order',
    description: 'Fulfill a sales order',
  },
  send: {
    name: 'Send',
    value: 'send',
    action: 'Send sales order',
    description: 'Send sales order via email',
  },
  print: {
    name: 'Print',
    value: 'print',
    action: 'Print sales order',
    description: 'Print sales order',
  },
};

const showOnlyForSalesOrder = {
  resource: [resources.salesOrder.value],
};

export const salesOrderNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForSalesOrder,
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
        ...showOnlyForSalesOrder,
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
        ...showOnlyForSalesOrder,
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
        ...showOnlyForSalesOrder,
        operation: [operations.getAll.value],
      },
    },
    description: 'Search by keyword',
  },
  // ----------------------------------
  //         get, update, delete, approve, reject, fulfill, send, print
  // ----------------------------------
  {
    displayName: 'ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForSalesOrder,
        operation: [
          operations.get.value,
          operations.update.value,
          operations.delete.value,
          operations.approve.value,
          operations.reject.value,
          operations.fulfill.value,
          operations.send.value,
          operations.print.value,
        ],
      },
    },
    description: 'The ID of the sales order',
  },
  // ----------------------------------
  //         create, update
  // ----------------------------------
  {
    displayName: 'Transaction Date',
    name: 'transaction_date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForSalesOrder,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Transaction Date (Format: YYYY-MM-DD)',
  },
  {
    displayName: 'Expiry Date',
    name: 'expiry_date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForSalesOrder,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Expiry Date (Format: YYYY-MM-DD)',
  },
  {
    displayName: 'Customer ID',
    name: 'customer',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForSalesOrder,
        operation: [operations.create.value, operations.update.value],
      },
    },
  },
  {
    displayName: 'Is Draft',
    name: 'draft',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        ...showOnlyForSalesOrder,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Whether to save as draft',
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
        ...showOnlyForSalesOrder,
        operation: [operations.create.value, operations.update.value],
      },
    },
    options: [
      {
        displayName: 'Item',
        name: 'item',
        values: [
          {
            displayName: 'Description',
            name: 'description',
            type: 'string',
            default: '',
          },
          {
            displayName: 'Discount',
            name: 'discount',
            type: 'number',
            default: 0,
            description: 'Discount amount or percentage',
          },
          {
            displayName: 'Is Discount Percent',
            name: 'is_discount_percent',
            type: 'boolean',
            default: false,
            description: 'Whether the discount is a percentage',
          },
          {
            displayName: 'Price',
            name: 'price',
            type: 'number',
            default: 0,
            required: true,
          },
          {
            displayName: 'Product ID',
            name: 'product_id',
            type: 'string',
            default: '',
            required: true,
          },
          {
            displayName: 'Quantity',
            name: 'qty',
            type: 'number',
            default: 1,
            required: true,
          },
          {
            displayName: 'Tax ID',
            name: 'tax_id',
            type: 'string',
            default: '',
            description: 'Tax ID (Separate multiple taxes with comma i.e:\t1,2,3)',
          },
          {
            displayName: 'Unit ID',
            name: 'unit_id',
            type: 'string',
            default: '',
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
        ...showOnlyForSalesOrder,
        operation: [operations.create.value, operations.update.value],
      },
    },
    options: [
      {
        displayName: 'Bill Address',
        name: 'bill_address',
        type: 'string',
        default: '',
        description: 'Customer billing address',
      },
      {
        displayName: 'Category ID',
        name: 'category',
        type: 'number',
        default: 0,
      },
      {
        displayName: 'Currency ID',
        name: 'currency',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'Customer email',
      },
      {
        displayName: 'Memo',
        name: 'memo',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Message',
        name: 'message',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Payment Term ID',
        name: 'payment_term',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Reference No',
        name: 'reference_no',
        type: 'string',
        default: '',
        description: 'Reference number',
      },
      {
        displayName: 'Transaction No',
        name: 'transaction_no',
        type: 'string',
        default: '',
        description: 'Transaction number',
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
        ...showOnlyForSalesOrder,
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
        ...showOnlyForSalesOrder,
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
        ...showOnlyForSalesOrder,
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
        ...showOnlyForSalesOrder,
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
        ...showOnlyForSalesOrder,
        operation: [operations.print.value],
      },
    },
  },
];

export { router } from './router';
