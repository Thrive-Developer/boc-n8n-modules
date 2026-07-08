import type { INodeProperties } from 'n8n-workflow';

export const resources = {
  unit: {
    name: 'Unit',
    value: 'unit',
  },
};

export const operations = {
  getAll: {
    name: 'Get Many',
    value: 'getAll',
    action: 'Get many units',
    description: 'Get all units',
  },
  create: {
    name: 'Create',
    value: 'create',
    action: 'Create a unit',
    description: 'Create a new unit',
  },
  get: {
    name: 'Get',
    value: 'get',
    action: 'Get a unit',
    description: 'Get a unit by ID',
  },
  update: {
    name: 'Update',
    value: 'update',
    action: 'Update a unit',
    description: 'Update a unit',
  },
  delete: {
    name: 'Delete',
    value: 'delete',
    action: 'Delete a unit',
    description: 'Delete a unit',
  },
};

const showOnlyForUnit = {
  resource: [resources.unit.value],
};

export const unitNode: INodeProperties[] = [
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForUnit,
    },
    options: [...Object.values(operations)],
    default: operations.getAll.value,
  },
  {
    displayName: 'ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.unit.value],
        operation: [operations.get.value, operations.update.value, operations.delete.value],
      },
    },
    description: 'The ID of the unit',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: [resources.unit.value],
        operation: [operations.create.value, operations.update.value],
      },
    },
    description: 'The name of the unit',
  },
];

export { router } from './router';
