import { INodeProperties } from 'n8n-workflow';

export const resources = {
  product: {
    name: 'Product',
    value: 'product',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get many products',
    description: 'Get all products',
  },
  create: {
    name: 'Create',
    value: 'create',
    action: 'Create a product',
    description: 'Create a new product',
  },
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get a product',
    description: 'Get a product by ID',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update a product',
    description: 'Update a product',
  },
  delete: {
    name: 'Delete',
    value: 'delete',
    action: 'Delete a product',
    description: 'Delete a product',
  },
};

const showOnlyForProduct = {
  resource: [resources.product.value],
};

export const productNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForProduct,
    },
    options: [...Object.values(operations)],
    default: operations.getAll.value,
  },
  {
    displayName: 'Page',
    name: 'page',
    type: 'number',
    default: 1,
    displayOptions: {
      show: {
        resource: [resources.product.value],
        operation: [operations.getAll.value],
      },
    },
    description: 'The page number to retrieve',
  },
  {
    displayName: 'Per Page',
    name: 'per_page',
    type: 'number',
    default: 15,
    displayOptions: {
      show: {
        resource: [resources.product.value],
        operation: [operations.getAll.value],
      },
    },
    description: 'The number of items to retrieve per page',
  },
  {
    displayName: 'Search',
    name: 'search',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.product.value],
        operation: [operations.getAll.value],
      },
    },
    description: 'Search string',
  },
  {
    displayName: 'ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.product.value],
        operation: [operations.get.value, operations.update.value, operations.delete.value],
      },
    },
    description: 'The ID of the product',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.product.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The name of the product',
  },
  {
    displayName: 'SKU',
    name: 'sku',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.product.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The SKU of the product',
  },
  {
    displayName: 'Category ID',
    name: 'category_id',
    type: 'number',
    default: 0,
    displayOptions: {
      show: {
        resource: [resources.product.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The category ID of the product',
  },
  {
    displayName: 'Unit ID',
    name: 'unit_id',
    type: 'number',
    default: 0,
    displayOptions: {
      show: {
        resource: [resources.product.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The unit ID of the product',
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.product.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The description of the product',
  },
  {
    displayName: 'Sale Price',
    name: 'sale_price',
    type: 'number',
    default: 0,
    displayOptions: {
      show: {
        resource: [resources.product.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The sale price of the product',
  },
  {
    displayName: 'Purchase Price',
    name: 'purchase_price',
    type: 'number',
    default: 0,
    displayOptions: {
      show: {
        resource: [resources.product.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The purchase price of the product',
  },
  {
    displayName: 'Is Sale',
    name: 'is_sale',
    type: 'boolean',
    default: true,
    displayOptions: {
      show: {
        resource: [resources.product.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Whether the product is for sale',
  },
  {
    displayName: 'Is Purchase',
    name: 'is_purchase',
    type: 'boolean',
    default: true,
    displayOptions: {
      show: {
        resource: [resources.product.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Whether the product is for purchase',
  },
  {
    displayName: 'Purchase Account ID',
    name: 'purchase_account',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.product.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The Default Buy Account Code (Required when Buy is true)',
  },
  {
    displayName: 'Sale Account ID',
    name: 'sale_account',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [resources.product.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The Default Sell Account Code (Required when Sell is true)',
  },
];

export { router } from './router';
