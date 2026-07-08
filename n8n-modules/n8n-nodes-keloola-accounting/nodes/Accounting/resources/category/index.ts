import { INodeProperties } from 'n8n-workflow';

export const resources = {
  category: {
    name: 'Category',
    value: 'category',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get many categories',
    description: 'Get all product categories',
  },
  create: {
    name: 'Create',
    value: 'create',
    action: 'Create a category',
    description: 'Create a new product category',
  },
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get a category',
    description: 'Get a product category by ID',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update a category',
    description: 'Update a product category',
  },
  delete: {
    name: 'Delete',
    value: 'delete',
    action: 'Delete a category',
    description: 'Delete a product category',
  },
};

const showOnlyForCategory = {
  resource: [resources.category.value],
};

export const categoryNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForCategory,
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
        resource: [resources.category.value],
        operation: [operations.get.value, operations.update.value, operations.delete.value],
      },
    },
    description: 'The ID of the product category',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.category.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The name of the product category',
  },
  {
    displayName: 'Type',
    name: 'type',
    type: 'string',
    required: true,
    default: 'product_service',
    displayOptions: {
      show: {
        resource: [resources.category.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The type of the product category',
  },
  {
    displayName: 'Color',
    name: 'color',
    type: 'color',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.category.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The color of the product category',
  },
];

export { router } from './router';
