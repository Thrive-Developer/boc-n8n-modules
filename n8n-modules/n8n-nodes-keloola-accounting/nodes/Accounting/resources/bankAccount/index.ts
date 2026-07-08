import type { INodeProperties } from 'n8n-workflow';

export const resources = {
  bankAccount: {
    name: 'Bank Account',
    value: 'bankAccount',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get many bank accounts',
    description: 'Get all bank accounts',
  },
};

const showOnlyForBankAccount = {
  resource: [resources.bankAccount.value],
};

export const bankAccountNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForBankAccount,
    },
    options: [...Object.values(operations)],
    default: operations.getAll.value,
  },
];

export { router } from './router';
