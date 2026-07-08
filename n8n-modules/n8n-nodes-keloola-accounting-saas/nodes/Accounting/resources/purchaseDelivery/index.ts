import { INodeProperties } from 'n8n-workflow';

export const resources = {
  purchaseDelivery: {
    name: 'Purchase Delivery',
    value: 'purchaseDelivery',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get many purchase deliveries',
    description: 'Get all purchase deliveries',
  },
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get a purchase delivery',
    description: 'Get a purchase delivery by ID',
  },
  create: {
    name: 'Create',
    value: 'create',
    action: 'Create purchase delivery',
    description: 'Create purchase delivery from Purchase Order',
  },
  createGrn: {
    name: 'Create Manual GRN',
    value: 'createGrn',
    action: 'Create Good Receive Note manually',
    description: 'Create a Good Receive Note manually (without Purchase Order)',
  },
};

const showOnlyForPurchaseDelivery = {
  resource: [resources.purchaseDelivery.value],
};

export const purchaseDeliveryNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForPurchaseDelivery,
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
        ...showOnlyForPurchaseDelivery,
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
        ...showOnlyForPurchaseDelivery,
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
        ...showOnlyForPurchaseDelivery,
        operation: [operations.getAll.value],
      },
    },
    description: 'Search by keyword',
  },
  {
    displayName: 'Status',
    name: 'status',
    type: 'options',
    options: [
      { name: 'All', value: 'all' },
      { name: 'Draft', value: 'draft' },
      { name: 'Partially Received', value: 'partially_received' },
      { name: 'Received', value: 'received' },
      { name: 'Sent', value: 'sent' },
      { name: 'Void', value: 'void' },
    ],
    default: 'all',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDelivery,
        operation: [operations.getAll.value],
      },
    },
    description: 'Purchase status',
  },
  // ----------------------------------
  //         get
  // ----------------------------------
  {
    displayName: 'ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDelivery,
        operation: [operations.get.value],
      },
    },
    description: 'The ID of the purchase delivery',
  },
  // ----------------------------------
  //         create
  // ----------------------------------
  {
    displayName: 'Purchase Order ID',
    name: 'order_id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDelivery,
        operation: [operations.create.value],
      },
    },
    description: 'The ID of the Purchase Order',
  },
  {
    displayName: 'Vendor ID',
    name: 'vendor',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDelivery,
        operation: [operations.create.value, operations.createGrn.value],
      },
    },
  },
  {
    displayName: 'Shipping Date',
    name: 'shipping_date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDelivery,
        operation: [operations.create.value],
      },
    },
    description: 'Shipping Date (Format: YYYY-MM-DD)',
  },
  {
    displayName: 'Arrival Date',
    name: 'arrival_date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDelivery,
        operation: [operations.create.value],
      },
    },
    description: 'Estimated Time of Arrival (Format: YYYY-MM-DD)',
  },
  {
    displayName: 'Shipping Via',
    name: 'shipping_via',
    type: 'options',
    options: [
      { name: 'AnterAja', value: 'anteraja' },
      { name: 'J&T', value: 'jnt' },
      { name: 'JNE', value: 'jne' },
      { name: 'Lion Parcel', value: 'lion_parcel' },
      { name: 'Other', value: 'other' },
      { name: 'Paxel', value: 'paxel' },
      { name: 'Pos Indonesia', value: 'pos_indonesia' },
      { name: 'Sicepat', value: 'sicepat' },
      { name: 'Tiki', value: 'tiki' },
    ],
    required: true,
    default: 'jnt',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDelivery,
        operation: [operations.create.value],
      },
    },
    description: 'Shipping carrier or method',
  },
  {
    displayName: 'Tracking Number',
    name: 'tracking_number',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDelivery,
        operation: [operations.create.value],
      },
    },
    description: 'Shipment tracking number',
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
        ...showOnlyForPurchaseDelivery,
        operation: [operations.create.value],
      },
    },
    options: [
      {
        displayName: 'Item',
        name: 'item',
        values: [
          {
            displayName: 'Purchase Item ID',
            name: 'purchase_item_id',
            type: 'string',
            default: '',
            required: true,
            description: 'The ID of the purchase order line item',
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
            displayName: 'Description',
            name: 'description',
            type: 'string',
            default: '',
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
        ...showOnlyForPurchaseDelivery,
        operation: [operations.create.value],
      },
    },
    options: [
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
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
        displayName: 'Reference No',
        name: 'reference_no',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Transaction No',
        name: 'transaction_no',
        type: 'string',
        default: '',
      },
    ],
  },
  // ----------------------------------
  //         createGrn (manual, without PO)
  // ----------------------------------
  {
    displayName: 'Received Date',
    name: 'received_date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDelivery,
        operation: [operations.createGrn.value],
      },
    },
    description: 'Date goods were received (Format: YYYY-MM-DD)',
  },
  {
    displayName: 'Products',
    name: 'grn_products',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDelivery,
        operation: [operations.createGrn.value],
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
            displayName: 'Received Quantity',
            name: 'received_qty',
            type: 'number',
            default: 1,
            required: true,
            description: 'Quantity received',
          },
          {
            displayName: 'Description',
            name: 'description',
            type: 'string',
            default: '',
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
        ...showOnlyForPurchaseDelivery,
        operation: [operations.createGrn.value],
      },
    },
    options: [
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'Vendor email',
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
        displayName: 'Reference No',
        name: 'reference_no',
        type: 'string',
        default: '',
        description: 'Reference number',
      },
      {
        displayName: 'Stock Officer ID',
        name: 'stock_officer_id',
        type: 'string',
        default: '',
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
