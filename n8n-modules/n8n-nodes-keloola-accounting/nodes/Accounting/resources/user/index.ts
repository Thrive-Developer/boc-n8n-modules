import type { INodeProperties } from 'n8n-workflow';

export const operations = {
  currentUser: {
    name: 'Get Current User',
    value: 'currentUser',
    action: 'Get current user',
    description: 'Get the current user logged in',
  },
};

export const resources = {
  user: {
    name: 'User',
    value: 'user',
  },
};

const showOnlyForUsers = {
  resource: [resources.user.value],
};

export const userNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForUsers,
    },
    options: [...Object.values(operations)],
    default: operations.currentUser.value,
  },
];
