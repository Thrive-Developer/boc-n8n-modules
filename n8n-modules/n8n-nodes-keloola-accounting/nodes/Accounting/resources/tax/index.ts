import { INodeProperties } from 'n8n-workflow';

export const resources = {
  tax: {
    name: 'Tax',
    value: 'tax',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get many taxes',
    description: 'Get all taxes',
  },
  create: {
    name: 'Create',
    value: 'create',
    action: 'Create a tax',
    description: 'Create a new tax',
  },
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get a tax',
    description: 'Get a tax by ID',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update a tax',
    description: 'Update a tax',
  },
  delete: {
    name: 'Delete',
    value: 'delete',
    action: 'Delete a tax',
    description: 'Delete a tax',
  },
};

const showOnlyForTax = {
  resource: [resources.tax.value],
};

export const taxNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForTax,
    },
    options: [...Object.values(operations)],
    default: operations.getAll.value,
  },
  {
    displayName: 'ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.tax.value],
        operation: [operations.get.value, operations.update.value, operations.delete.value],
      },
    },
    description: 'The ID of the tax',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.tax.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The name of the tax',
  },
  {
    displayName: 'Rate',
    name: 'rate',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: [resources.tax.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The tax rate',
  },
  {
    displayName: 'Sale Account ID',
    name: 'saleAccount',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.tax.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The sale account ID (UUID)',
  },
  {
    displayName: 'Purchase Account ID',
    name: 'purchaseAccount',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.tax.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The purchase account ID (UUID)',
  },
  {
    displayName: 'Type',
    name: 'type',
    type: 'options',
    required: true,
    options: [
      {
        name: 'Exclusive',
        value: 'exclusive',
      },
      {
        name: 'Inclusive',
        value: 'inclusive',
      },
    ],
    default: 'exclusive',
    displayOptions: {
      show: {
        resource: [resources.tax.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The type of the tax',
  },
  {
    displayName: 'Custom Rule',
    name: 'customRule',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: [resources.tax.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Whether to use custom rule',
  },
  {
    displayName: 'Luxury Goods',
    name: 'luxuryGoods',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.tax.value],
        operation: [operations.create.value, operations.update.value],
        customRule: [true],
      },
    },
    description: 'The luxury goods rate',
  },
  {
    displayName: 'Non Luxury Goods',
    name: 'nonLuxuryGoods',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.tax.value],
        operation: [operations.create.value, operations.update.value],
        customRule: [true],
      },
    },
    description: 'The non luxury goods rate',
  },
];

export { router } from './router';
