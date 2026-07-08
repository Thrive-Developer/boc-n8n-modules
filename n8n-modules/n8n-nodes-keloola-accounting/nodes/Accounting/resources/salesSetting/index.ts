import type { INodeProperties } from 'n8n-workflow';

export const resources = {
  salesSetting: {
    name: 'Sales Setting',
    value: 'salesSetting',
  },
};

export const operations = {
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get sales settings',
    description: 'Get sales settings',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update sales settings',
    description: 'Update sales settings',
  },
};

const showOnlyForSalesSetting = {
  resource: [resources.salesSetting.value],
};

export const salesSettingNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForSalesSetting,
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
        resource: [resources.salesSetting.value],
        operation: [operations.update.value],
      },
    },
  },
  {
    displayName: 'Sales Order Approval',
    name: 'salesOrderApproval',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: [resources.salesSetting.value],
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
        resource: [resources.salesSetting.value],
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
        displayName: 'Sales Description',
        name: 'salesDescription',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Delivery Description',
        name: 'deliveryDescription',
        type: 'string',
        default: '',
      },
    ],
  },
];

export { router } from './router';
