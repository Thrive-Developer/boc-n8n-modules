import { INodeProperties } from 'n8n-workflow';

export const resources = {
  contact: {
    name: 'Contact',
    value: 'contact',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get many contacts',
    description: 'Get all contacts',
  },
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get a contact',
    description: 'Get a contact by ID',
  },
  create: {
    name: 'Create',
    value: 'create',
    action: 'Create a contact',
    description: 'Create a new contact',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update a contact',
    description: 'Update a contact',
  },
  delete: {
    name: 'Delete',
    value: 'delete',
    action: 'Delete a contact',
    description: 'Delete a contact',
  },
};

const showOnlyForContact = {
  resource: [resources.contact.value],
};

export const contactNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForContact,
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
        ...showOnlyForContact,
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
        ...showOnlyForContact,
        operation: [operations.getAll.value],
      },
    },
    description: 'Number of items per page',
  },
  {
    displayName: 'Contact Type',
    name: 'contact_type',
    type: 'options',
    required: true,
    options: [
      { name: 'Customer', value: 'customer' },
      { name: 'Vendor', value: 'vendor' },
    ],
    default: 'customer',
    displayOptions: {
      show: {
        ...showOnlyForContact,
        operation: [operations.getAll.value, operations.delete.value],
      },
    },
    description: 'Filter by contact type',
  },
  {
    displayName: 'Search',
    name: 'search',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForContact,
        operation: [operations.getAll.value],
      },
    },
    description: 'Search by keyword',
  },
  // ----------------------------------
  //         get, update, delete
  // ----------------------------------
  {
    displayName: 'ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForContact,
        operation: [operations.get.value, operations.update.value, operations.delete.value],
      },
    },
    description: 'The ID of the contact',
  },
  // ----------------------------------
  //         create, update
  // ----------------------------------
  {
    displayName: 'Contact Type',
    name: 'contact_type',
    type: 'options',
    required: true,
    options: [
      { name: 'Customer', value: 'customer' },
      { name: 'Vendor', value: 'vendor' },
    ],
    default: 'customer',
    displayOptions: {
      show: {
        ...showOnlyForContact,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Type of contact',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForContact,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Name of the contact',
  },
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    placeholder: 'name@email.com',
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForContact,
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'Email address',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        ...showOnlyForContact,
        operation: [operations.create.value, operations.update.value],
      },
    },
    options: [
      {
        displayName: 'Billing Address',
        name: 'billing_address',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Billing City',
        name: 'billing_city',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Billing Country',
        name: 'billing_country',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Billing Name',
        name: 'billing_name',
        type: 'string',
        default: '',
        description: 'Billing recipient name',
      },
      {
        displayName: 'Billing State',
        name: 'billing_state',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Company Name',
        name: 'company_name',
        type: 'string',
        default: '',
      },
      {
        displayName: 'ID Number',
        name: 'id_number',
        type: 'string',
        default: '',
        description: 'ID number (KTP/Passport)',
      },
      {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
        description: 'Phone number',
      },
      {
        displayName: 'Shipping Address',
        name: 'shipping_address',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Shipping City',
        name: 'shipping_city',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Shipping Country',
        name: 'shipping_country',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Shipping Name',
        name: 'shipping_name',
        type: 'string',
        default: '',
        description: 'Shipping recipient name',
      },
      {
        displayName: 'Shipping State',
        name: 'shipping_state',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Tax Number',
        name: 'tax_number',
        type: 'number',
        default: 0,
        description: 'Tax number (NPWP)',
      },
    ],
  },
];

export { router } from './router';
