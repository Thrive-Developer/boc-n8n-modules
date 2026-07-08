import { INodeProperties } from 'n8n-workflow';

export const resources = {
  salesDelivery: {
    name: 'Sales Delivery',
    value: 'salesDelivery',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get many sales deliveries',
    description: 'Get all sales deliveries',
  },
  create: {
    name: 'Create',
    value: 'create',
    action: 'Create a sales delivery',
    description: 'Create a new sales delivery',
  },
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get a sales delivery',
    description: 'Get a sales delivery by ID',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update a sales delivery',
    description: 'Update a sales delivery',
  },
  delete: {
    name: 'Delete',
    value: 'delete',
    action: 'Delete a sales delivery',
    description: 'Delete a sales delivery',
  },
  release: {
    name: 'Release',
    value: 'release',
    action: 'Release a sales delivery',
    description: 'Release a sales delivery',
  },
  markArrived: {
    name: 'Mark Arrived',
    value: 'markArrived',
    action: 'Mark a sales delivery as arrived',
    description: 'Mark a sales delivery as arrived',
  },
  startDelivery: {
    name: 'Start Delivery',
    value: 'startDelivery',
    action: 'Start a sales delivery',
    description: 'Start a sales delivery',
  },
};

const showOnlyForSalesDelivery = {
  resource: [resources.salesDelivery.value],
};

export const salesDeliveryNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForSalesDelivery,
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
        ...showOnlyForSalesDelivery,
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
        ...showOnlyForSalesDelivery,
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
        ...showOnlyForSalesDelivery,
        operation: [operations.getAll.value],
      },
    },
    description: 'Search by keyword',
  },
  // ----------------------------------
  //         get, update, delete, release, markArrived, startDelivery
  // ----------------------------------
  {
    displayName: 'ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForSalesDelivery,
        operation: [
          operations.get.value,
          operations.update.value,
          operations.delete.value,
          operations.release.value,
          operations.markArrived.value,
          operations.startDelivery.value,
        ],
      },
    },
    description: 'The ID of the sales delivery',
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
        ...showOnlyForSalesDelivery,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Transaction Date (Format: YYYY-MM-DD)',
  },
  {
    displayName: 'Shipping Date',
    name: 'shipping_date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForSalesDelivery,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Shipping Date (Format: YYYY-MM-DD)',
  },
  {
    displayName: 'Expiry Date',
    name: 'expiry_date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForSalesDelivery,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Expiry Date (Format: YYYY-MM-DD)',
  },
  {
    displayName: 'Sales Order ID',
    name: 'order_id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForSalesDelivery,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The ID of the Sales Order to create a delivery from',
  },
  {
    displayName: 'Customer ID',
    name: 'customer',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForSalesDelivery,
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
        ...showOnlyForSalesDelivery,
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
        ...showOnlyForSalesDelivery,
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
            displayName: 'Sale Item ID',
            name: 'sale_item_id',
            type: 'string',
            default: '',
            required: true,
            description: 'The ID of the sale order line item',
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
        ...showOnlyForSalesDelivery,
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
];

export { router } from './router';
