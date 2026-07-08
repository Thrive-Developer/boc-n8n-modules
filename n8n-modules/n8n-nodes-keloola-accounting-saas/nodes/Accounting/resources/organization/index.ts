import type { INodeProperties } from 'n8n-workflow';

export const operations = {
  get: {
    name: 'Get Organizations',
    value: 'get',
    action: 'Get user organizations',
    description: "Get the user's organizations",
  },
};

export const resources = {
  organization: {
    name: 'Organization',
    value: 'organization',
  },
};

const showOnlyForOrganizations = {
  resource: [resources.organization.value],
};

export const organizationNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForOrganizations,
    },
    options: [...Object.values(operations)],
    default: operations.get.value,
  },
];
