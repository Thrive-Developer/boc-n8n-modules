import type { INodeProperties } from 'n8n-workflow';

export const resources = {
  companySetting: {
    name: 'Company Setting',
    value: 'companySetting',
  },
};

export const operations = {
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get company settings',
    description: 'Get company settings',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update company settings',
    description: 'Update company settings',
  },
  updateBank: {
    name: 'Update Bank',
    value: 'updateBank',
    action: 'Update company bank settings',
    description: 'Update company bank settings',
  },
};

const showOnlyForCompanySetting = {
  resource: [resources.companySetting.value],
};

export const companySettingNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForCompanySetting,
    },
    options: [...Object.values(operations)],
    default: operations.get.value,
  },
  // Update Company Settings Fields
  {
    displayName: 'Company Name',
    name: 'company_name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.companySetting.value],
        operation: [operations.update.value],
      },
    },
  },
  {
    displayName: 'Company Email',
    name: 'company_email',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.companySetting.value],
        operation: [operations.update.value],
      },
    },
  },
  {
    displayName: 'Company City',
    name: 'company_city',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.companySetting.value],
        operation: [operations.update.value],
      },
    },
  },
  {
    displayName: 'Company State',
    name: 'company_state',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.companySetting.value],
        operation: [operations.update.value],
      },
    },
  },
  {
    displayName: 'Company Country',
    name: 'company_country',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.companySetting.value],
        operation: [operations.update.value],
      },
    },
  },
  {
    displayName: 'Company Zipcode',
    name: 'company_zipcode',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.companySetting.value],
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
        resource: [resources.companySetting.value],
        operation: [operations.update.value],
      },
    },
    options: [
      {
        displayName: 'Company Address',
        name: 'company_address',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Company Phone',
        name: 'company_phone',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Company Registration Number',
        name: 'company_registration_number',
        type: 'number',
        default: 0,
      },
      {
        displayName: 'Company Timezone',
        name: 'company_timezone',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Company VAT/GST Number',
        name: 'company_vatgst_number',
        type: 'number',
        default: 0,
      },
    ],
  },
  // Update Bank Settings Fields
  {
    displayName: 'Company ID',
    name: 'company_id',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: [resources.companySetting.value],
        operation: [operations.updateBank.value],
      },
    },
  },
  {
    displayName: 'Bank Name',
    name: 'bank_name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.companySetting.value],
        operation: [operations.updateBank.value],
      },
    },
  },
  {
    displayName: 'Account Number',
    name: 'account_number',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: [resources.companySetting.value],
        operation: [operations.updateBank.value],
      },
    },
  },
  {
    displayName: 'Account Holder',
    name: 'account_holder',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.companySetting.value],
        operation: [operations.updateBank.value],
      },
    },
  },
  {
    displayName: 'Swift Code',
    name: 'swift_code',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.companySetting.value],
        operation: [operations.updateBank.value],
      },
    },
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFieldsBank',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: [resources.companySetting.value],
        operation: [operations.updateBank.value],
      },
    },
    options: [
      {
        displayName: 'Branch Office',
        name: 'branch_office',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Branch Address',
        name: 'branch_address',
        type: 'string',
        default: '',
      },
    ],
  },
];

export { router } from './router';
