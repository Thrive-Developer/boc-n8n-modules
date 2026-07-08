import { INodeProperties } from 'n8n-workflow';

export const resources = {
  purchaseDownPayment: {
    name: 'Purchase Down Payment',
    value: 'purchaseDownPayment',
  },
};

export const operations = {
  create: {
    name: 'Create',
    value: 'create',
    action: 'Create a purchase down payment',
    description: 'Create a new purchase down payment',
  },
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get a purchase down payment',
    description: 'Get a purchase down payment by ID',
  },
  send: {
    name: 'Send Mail',
    value: 'send',
    action: 'Send mail purchase down payment',
    description: 'Send mail purchase down payment',
  },
  print: {
    name: 'Print',
    value: 'print',
    action: 'Print purchase down payment',
    description: 'Print purchase down payment',
  },
};

const showOnlyForPurchaseDownPayment = {
  resource: [resources.purchaseDownPayment.value],
};

export const purchaseDownPaymentNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForPurchaseDownPayment,
    },
    options: [...Object.values(operations)],
    default: operations.create.value,
  },
  // ----------------------------------
  //         get, send, print
  // ----------------------------------
  {
    displayName: 'ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDownPayment,
        operation: [operations.get.value, operations.send.value, operations.print.value],
      },
    },
    description: 'The ID of the purchase down payment',
  },
  // ----------------------------------
  //         create
  // ----------------------------------
  {
    displayName: 'Company ID',
    name: 'company_id',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDownPayment,
        operation: [operations.create.value],
      },
    },
    description: 'The ID of the company',
  },
  {
    displayName: 'Purchase Order ID',
    name: 'purchase_order_id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDownPayment,
        operation: [operations.create.value],
      },
    },
    description: 'The ID of the purchase order',
  },
  {
    displayName: 'Paid From Account Name or ID',
    name: 'paid_from_account',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getBankAccounts',
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDownPayment,
        operation: [operations.create.value],
      },
    },
    description:
      'The account from which the payment is made. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Transaction Date',
    name: 'transaction_date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDownPayment,
        operation: [operations.create.value],
      },
    },
    description: 'Format: YYYY-MM-DD',
  },
  {
    displayName: 'Amount',
    name: 'amount',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDownPayment,
        operation: [operations.create.value],
      },
    },
    description: 'The amount of down payment',
  },
  {
    displayName: 'Payment Method',
    name: 'payment_method',
    type: 'options',
    options: [
      { name: 'Bank Transfer', value: 'bank_transfer' },
      { name: 'Check', value: 'check' },
    ],
    required: true,
    default: 'bank_transfer',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDownPayment,
        operation: [operations.create.value],
      },
    },
  },
  {
    displayName: 'Payment Proof',
    name: 'payment_proof',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDownPayment,
        operation: [operations.create.value],
      },
    },
    description: 'The proof of payment (URL or path)',
  },
  // ----------------------------------
  //         send
  // ----------------------------------
  {
    displayName: 'To',
    name: 'to',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDownPayment,
        operation: [operations.send.value],
      },
    },
    description: 'The recipient email addresses, comma-separated',
  },
  {
    displayName: 'Template',
    name: 'template',
    type: 'options',
    options: [
      { name: 'Template 1', value: 'template-1' },
      { name: 'Template 2', value: 'template-2' },
    ],
    required: true,
    default: 'template-1',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDownPayment,
        operation: [operations.send.value],
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
        ...showOnlyForPurchaseDownPayment,
        operation: [operations.send.value],
      },
    },
    options: [
      {
        displayName: 'CC',
        name: 'cc',
        type: 'string',
        default: '',
        description: 'The CC email addresses, comma-separated',
      },
      {
        displayName: 'Message',
        name: 'message',
        type: 'string',
        default: '',
      },
    ],
  },
  // ----------------------------------
  //         print
  // ----------------------------------
  {
    displayName: 'Print Template',
    name: 'template_print',
    type: 'options',
    options: [
      { name: 'Template 1', value: 'template-1' },
      { name: 'Template 2', value: 'template-2' },
    ],
    default: 'template-1',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDownPayment,
        operation: [operations.print.value],
      },
    },
  },
  {
    displayName: 'Preview Type',
    name: 'preview_type',
    type: 'options',
    options: [
      { name: 'PDF', value: 'pdf' },
      { name: 'HTML', value: 'html' },
    ],
    default: 'pdf',
    displayOptions: {
      show: {
        ...showOnlyForPurchaseDownPayment,
        operation: [operations.print.value],
      },
    },
  },
];

export { router } from './router';
