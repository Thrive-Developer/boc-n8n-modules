import type { INodeProperties } from 'n8n-workflow';

export const resources = {
  systemSetting: {
    name: 'System Setting',
    value: 'systemSetting',
  },
};

export const operations = {
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get system settings',
    description: 'Get system settings',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update system settings',
    description: 'Update system settings',
  },
};

const showOnlyForSystemSetting = {
  resource: [resources.systemSetting.value],
};

export const systemSettingNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForSystemSetting,
    },
    options: [...Object.values(operations)],
    default: operations.get.value,
  },
  {
    displayName: 'Currency Name or ID',
    name: 'sys_setting_currency',
    type: 'options',
    required: true,
    default: '',
    typeOptions: {
      loadOptionsMethod: 'getCurrencies',
    },
    displayOptions: {
      show: {
        resource: [resources.systemSetting.value],
        operation: [operations.update.value],
      },
    },
    description:
      'The currency for the system. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Currency Symbol Position',
    name: 'sys_setting_currency_symbol_position',
    type: 'options',
    required: true,
    default: 'pre',
    options: [
      { name: 'Prefix', value: 'pre' },
      { name: 'Postfix', value: 'post' },
    ],
    displayOptions: {
      show: {
        resource: [resources.systemSetting.value],
        operation: [operations.update.value],
      },
    },
  },
  {
    displayName: 'Multi Currency',
    name: 'sys_setting_multi_currency',
    type: 'boolean',
    required: true,
    default: false,
    displayOptions: {
      show: {
        resource: [resources.systemSetting.value],
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
        resource: [resources.systemSetting.value],
        operation: [operations.update.value],
      },
    },
    options: [
      {
        displayName: 'Date Format',
        name: 'sys_setting_date_format',
        type: 'string',
        default: 'Y-m-d',
      },
      {
        displayName: 'Decimal Format',
        name: 'sys_setting_decimal_format',
        type: 'number',
        typeOptions: {
          maxValue: 3,
        },
        default: 2,
      },
      {
        displayName: 'Shipping Display',
        name: 'sys_setting_shipping_display',
        type: 'boolean',
        default: true,
      },
      {
        displayName: 'Time Format',
        name: 'sys_setting_time_format',
        type: 'string',
        default: 'H:i:s',
      },
      {
        displayName: 'Unique SKU Product',
        name: 'sys_setting_unique_sku_product',
        type: 'boolean',
        default: true,
      },
    ],
  },
];

export { router } from './router';
