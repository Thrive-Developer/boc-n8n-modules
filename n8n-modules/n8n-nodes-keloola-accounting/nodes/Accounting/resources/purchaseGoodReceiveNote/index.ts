import { INodeProperties } from 'n8n-workflow';

export const resources = {
  purchaseGoodReceiveNote: {
    name: 'Purchase Good Receive Note',
    value: 'purchaseGoodReceiveNote',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get many Good Receive Notes',
    description: 'Get all Good Receive Notes',
  },
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get a Good Receive Note',
    description: 'Get a Good Receive Note by ID',
  },
  create: {
    name: 'Create',
    value: 'create',
    action: 'Create a Good Receive Note',
    description: 'Create a Good Receive Note from Purchase Order',
  },
  handleDiscrepancy: {
    name: 'Handle Discrepancy',
    value: 'handleDiscrepancy',
    action: 'Handle Discrepancy',
    description: 'Handle discrepancy for Good Receive Note',
  },
};

const showOnlyForPurchaseGoodReceiveNote = {
  resource: [resources.purchaseGoodReceiveNote.value],
};

export const purchaseGoodReceiveNoteNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForPurchaseGoodReceiveNote,
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
        ...showOnlyForPurchaseGoodReceiveNote,
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
        ...showOnlyForPurchaseGoodReceiveNote,
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
        ...showOnlyForPurchaseGoodReceiveNote,
        operation: [operations.getAll.value],
      },
    },
    description: 'Search by keyword',
  },
  {
    displayName: 'Purchase ID',
    name: 'purchase_id',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseGoodReceiveNote,
        operation: [operations.getAll.value],
      },
    },
    description: 'Filter by Purchase ID',
  },
  // ----------------------------------
  //         get, handleDiscrepancy
  // ----------------------------------
  {
    displayName: 'ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseGoodReceiveNote,
        operation: [operations.get.value, operations.handleDiscrepancy.value],
      },
    },
    description: 'The ID of the Good Receive Note',
  },
  // ----------------------------------
  //         create, handleDiscrepancy
  // ----------------------------------
  {
    displayName: 'Purchase Delivery ID',
    name: 'purchase_id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseGoodReceiveNote,
        operation: [operations.create.value, operations.handleDiscrepancy.value],
      },
    },
    description: 'The ID of the Purchase Delivery',
  },
  // ----------------------------------
  //         create
  // ----------------------------------
  {
    displayName: 'Received Date',
    name: 'received_date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseGoodReceiveNote,
        operation: [operations.create.value],
      },
    },
    description: 'Received Date (Format: YYYY-MM-DD)',
  },
  {
    displayName: 'Stock Officer ID',
    name: 'stock_officer_id',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseGoodReceiveNote,
        operation: [operations.create.value],
      },
    },
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
        ...showOnlyForPurchaseGoodReceiveNote,
        operation: [operations.create.value],
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
          },
        ],
      },
    ],
  },
  // ----------------------------------
  //         handleDiscrepancy
  // ----------------------------------
  {
    displayName: 'Reason',
    name: 'reason',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseGoodReceiveNote,
        operation: [operations.handleDiscrepancy.value],
      },
    },
    description: 'Discrepancy Reason',
  },
  {
    displayName: 'Action',
    name: 'action',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseGoodReceiveNote,
        operation: [operations.handleDiscrepancy.value],
      },
    },
    description: 'Discrepancy Action',
  },
];

export { router } from './router';
