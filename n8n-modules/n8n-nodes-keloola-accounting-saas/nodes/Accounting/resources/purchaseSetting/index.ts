import type { INodeProperties } from 'n8n-workflow';

export const resources = {
  purchaseSetting: {
    name: 'Purchase Setting',
    value: 'purchaseSetting',
  },
};

export const operations = {
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get purchase settings',
    description: 'Get purchase settings',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update purchase settings',
    description: 'Update purchase settings',
  },
};

const showOnlyForPurchaseSetting = {
  resource: [resources.purchaseSetting.value],
};

export const purchaseSettingNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForPurchaseSetting,
    },
    options: [...Object.values(operations)],
    default: operations.get.value,
  },
  {
    displayName: 'Discount',
    name: 'discount',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: [resources.purchaseSetting.value],
        operation: [operations.update.value],
      },
    },
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: [resources.purchaseSetting.value],
        operation: [operations.update.value],
      },
    },
    options: [
      {
        displayName: 'Term',
        name: 'term',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
      },
    ],
  },
];

export { router } from './router';
