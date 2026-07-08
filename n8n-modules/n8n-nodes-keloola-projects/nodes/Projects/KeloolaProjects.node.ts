import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import type {
  IDataObject,
  IExecuteFunctions,
  IHttpRequestMethods,
  INodeExecutionData,
  INodeProperties,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

interface KeloolaProjectsCredentials {
  baseUrl?: string;
  accessToken?: string;
}

const credentialName = 'keloolaProjectsApi';

const priorityOptions = [
  { name: 'Low', value: 'low' },
  { name: 'Medium', value: 'medium' },
  { name: 'High', value: 'high' },
  { name: 'Urgent', value: 'urgent' },
];

const taskTypeOptions = [
  { name: 'Task', value: 'task' },
  { name: 'Bug', value: 'bug' },
  { name: 'Story', value: 'story' },
  { name: 'Epic', value: 'epic' },
];

const anyOption = { name: 'Any', value: '' };

function show(resource: string[], operation?: string[]): INodeProperties['displayOptions'] {
  return {
    show: {
      resource,
      ...(operation ? { operation } : {}),
    },
  };
}

function addStringParameter(
  executeFunctions: IExecuteFunctions,
  target: IDataObject,
  parameterName: string,
  targetName = parameterName,
): void {
  const value = executeFunctions.getNodeParameter(parameterName, 0, '') as string;
  if (value) {
    target[targetName] = value;
  }
}

function addNumberParameter(
  executeFunctions: IExecuteFunctions,
  target: IDataObject,
  parameterName: string,
  targetName = parameterName,
): void {
  const value = executeFunctions.getNodeParameter(parameterName, 0, '') as string | number;
  if (value !== '') {
    target[targetName] = Number(value);
  }
}

function requireString(
  executeFunctions: IExecuteFunctions,
  parameterName: string,
  message: string,
): string {
  const value = executeFunctions.getNodeParameter(parameterName, 0, '') as string;
  if (!value) {
    throw new NodeOperationError(executeFunctions.getNode(), message);
  }

  return value;
}

function buildConnectorFields(connectorFields: IDataObject): IDataObject {
  const connectorFieldsBody: IDataObject = {};

  for (const key of ['daily_task_category_id', 'daily_task_type_id', 'objective_id']) {
    const value = connectorFields[key] as string | undefined;
    if (value) {
      connectorFieldsBody[key] = value;
    }
  }

  const keyResults = connectorFields.key_results as string | undefined;
  if (keyResults) {
    connectorFieldsBody.key_results = keyResults
      .split(',')
      .map((keyResult) => keyResult.trim())
      .filter(Boolean);
  }

  return connectorFieldsBody;
}

function addJsonParameter(
  executeFunctions: IExecuteFunctions,
  target: IDataObject,
  parameterName: string,
  targetName = parameterName,
): void {
  const value = executeFunctions.getNodeParameter(parameterName, 0, '') as string;
  if (!value) {
    return;
  }

  try {
    target[targetName] = JSON.parse(value) as IDataObject;
  } catch (error) {
    throw new NodeOperationError(
      executeFunctions.getNode(),
      `${parameterName} must be valid JSON`,
      {
        description: error instanceof Error ? error.message : undefined,
      },
    );
  }
}

function splitCsv(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

const properties: INodeProperties[] = [
  {
    displayName: 'Resource',
    name: 'resource',
    type: 'options',
    noDataExpression: true,
    options: [
      {
        name: 'Connector Field',
        value: 'connectorField',
      },
      {
        name: 'Note',
        value: 'note',
      },
      {
        name: 'Profile',
        value: 'profile',
      },
      {
        name: 'Project',
        value: 'project',
      },
      {
        name: 'Task',
        value: 'task',
      },
      {
        name: 'Task Comment',
        value: 'taskComment',
      },
      {
        name: 'Task Subtask',
        value: 'taskSubtask',
      },
      {
        name: 'Task Time Log',
        value: 'taskTimeLog',
      },
      {
        name: 'User',
        value: 'user',
      },
      {
        name: 'User API Token',
        value: 'userApiToken',
      },
    ],
    default: 'project',
  },
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: show(['profile']),
    options: [
      {
        name: 'Get',
        value: 'getProfile',
        description: 'Get the current API token owner profile',
        action: 'Get current profile',
      },
    ],
    default: 'getProfile',
  },
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: show(['connectorField']),
    options: [
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'List active connector task fields and valid BOS option IDs',
        action: 'Get connector fields',
      },
    ],
    default: 'getAll',
  },
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: show(['note']),
    options: [
      {
        name: 'Create',
        value: 'createNote',
        description: 'Create a note',
        action: 'Create a note',
      },
      {
        name: 'Delete',
        value: 'deleteNote',
        description: 'Delete a note permanently',
        action: 'Delete a note',
      },
      {
        name: 'Get',
        value: 'getNote',
        description: 'Get a note by ID',
        action: 'Get a note',
      },
      {
        name: 'Get Many',
        value: 'listNotes',
        description: 'List notes with pagination',
        action: 'List notes',
      },
      {
        name: 'Update',
        value: 'updateNote',
        description: 'Update a note',
        action: 'Update a note',
      },
    ],
    default: 'listNotes',
  },
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: show(['project']),
    options: [
      {
        name: 'Get',
        value: 'getProject',
        description: 'Get a project by ID',
        action: 'Get a project',
      },
      {
        name: 'Get Board Columns',
        value: 'getBoardColumns',
        description: 'List board columns for a project',
        action: 'Get project board columns',
      },
      {
        name: 'Get Labels',
        value: 'getLabels',
        description: 'List labels for a project',
        action: 'Get project labels',
      },
      {
        name: 'Get Many',
        value: 'listProjects',
        description: 'List projects with pagination',
        action: 'List projects',
      },
      {
        name: 'Get Sprint',
        value: 'getSprint',
        description: 'Get a sprint by ID',
        action: 'Get a sprint',
      },
      {
        name: 'Get Sprints',
        value: 'getSprints',
        description: 'List sprints for a project',
        action: 'Get project sprints',
      },
    ],
    default: 'listProjects',
  },
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: show(['task']),
    options: [
      {
        name: 'Create',
        value: 'createTask',
        description: 'Create a task',
        action: 'Create a task',
      },
      {
        name: 'Delete',
        value: 'deleteTask',
        description: 'Delete a task permanently',
        action: 'Delete a task',
      },
      {
        name: 'Get',
        value: 'getTaskDetail',
        description: 'Get a task by UUID',
        action: 'Get a task',
      },
      {
        name: 'Get Many',
        value: 'listTasks',
        description: 'List tasks with pagination',
        action: 'List tasks',
      },
      {
        name: 'Update',
        value: 'updateTask',
        description: 'Update a task',
        action: 'Update a task',
      },
    ],
    default: 'listTasks',
  },
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: show(['taskSubtask']),
    options: [
      {
        name: 'Create',
        value: 'createSubtask',
        description: 'Create a subtask under a parent task',
        action: 'Create a subtask',
      },
      {
        name: 'Get Many',
        value: 'listSubtasks',
        description: 'List direct subtasks under a parent task',
        action: 'List subtasks',
      },
    ],
    default: 'listSubtasks',
  },
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: show(['taskComment']),
    options: [
      {
        name: 'Create',
        value: 'createComment',
        description: 'Add a comment to a task',
        action: 'Create a task comment',
      },
      {
        name: 'Get Many',
        value: 'listComments',
        description: 'List comments on a task',
        action: 'List task comments',
      },
    ],
    default: 'listComments',
  },
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: show(['taskTimeLog']),
    options: [
      {
        name: 'Create',
        value: 'createTimeLog',
        description: 'Log time against a task',
        action: 'Create a task time log',
      },
      {
        name: 'Get Many',
        value: 'listTimeLogs',
        description: 'List time logs on a task',
        action: 'List task time logs',
      },
    ],
    default: 'listTimeLogs',
  },
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: show(['user']),
    options: [
      {
        name: 'Get',
        value: 'getUser',
        description: 'Get a user by ID',
        action: 'Get a user',
      },
      {
        name: 'Get Many',
        value: 'listUsers',
        description: 'List users with pagination',
        action: 'List users',
      },
    ],
    default: 'listUsers',
  },
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: show(['userApiToken']),
    options: [
      {
        name: 'Create',
        value: 'createApiToken',
        description: 'Generate a new API token for a user',
        action: 'Create user API token',
      },
      {
        name: 'Delete',
        value: 'deleteApiToken',
        description: 'Revoke a user API token',
        action: 'Delete user API token',
      },
      {
        name: 'Get Many',
        value: 'listApiTokens',
        description: 'List API tokens for a user',
        action: 'List user API tokens',
      },
    ],
    default: 'listApiTokens',
  },
  {
    displayName: 'Project ID',
    name: 'project_id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: show(['task'], ['createTask', 'listTasks']),
    description: 'Project UUID',
  },
  {
    displayName: 'Project ID',
    name: 'project_id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: show(['project'], ['getProject', 'getSprints', 'getBoardColumns', 'getLabels']),
    description: 'Project UUID',
  },
  {
    displayName: 'Project ID',
    name: 'project_id',
    type: 'string',
    default: '',
    displayOptions: show(['note'], ['createNote', 'listNotes']),
    description: 'Optional project UUID',
  },
  {
    displayName: 'Sprint ID',
    name: 'sprint_id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: show(['project'], ['getSprint']),
    description: 'Sprint UUID',
  },
  {
    displayName: 'Task ID',
    name: 'task_id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: show(
      ['task', 'taskSubtask', 'taskComment', 'taskTimeLog'],
      [
        'deleteTask',
        'getTaskDetail',
        'updateTask',
        'listSubtasks',
        'createSubtask',
        'listComments',
        'createComment',
        'listTimeLogs',
        'createTimeLog',
      ],
    ),
    description: 'Task UUID',
  },
  {
    displayName: 'Note ID',
    name: 'note_id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: show(['note'], ['getNote', 'updateNote', 'deleteNote']),
  },
  {
    displayName: 'User ID',
    name: 'user_id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: show(
      ['user', 'userApiToken'],
      ['getUser', 'listApiTokens', 'createApiToken', 'deleteApiToken'],
    ),
    description: 'User UUID',
  },
  {
    displayName: 'Token ID',
    name: 'token_id',
    type: 'string',
				typeOptions: { password: true },
    required: true,
    default: '',
    displayOptions: show(['userApiToken'], ['deleteApiToken']),
    description: 'API token ID',
  },
  {
    displayName: 'Token Name',
    name: 'token_name',
    type: 'string',
				typeOptions: { password: true },
    required: true,
    default: '',
    displayOptions: show(['userApiToken'], ['createApiToken']),
    description: 'Name for the generated API token',
  },
  {
    displayName: 'Abilities',
    name: 'abilities',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'tasks:read,tasks:create',
    displayOptions: show(['userApiToken'], ['createApiToken']),
    description: 'Comma-separated API token abilities',
  },
  {
    displayName: 'Expires At',
    name: 'expires_at',
    type: 'string',
    default: '',
    placeholder: '2027-01-01',
    displayOptions: show(['userApiToken'], ['createApiToken']),
    description: 'Optional token expiration date in YYYY-MM-DD format',
  },
  {
    displayName: 'Title',
    name: 'title',
    type: 'string',
    required: true,
    default: '',
    displayOptions: show(['note'], ['createNote']),
    description: 'Title of the note',
  },
  {
    displayName: 'Title',
    name: 'title',
    type: 'string',
    default: '',
    displayOptions: show(['note'], ['updateNote']),
    description: 'New title for the note',
  },
  {
    displayName: 'Content',
    name: 'content',
    type: 'string',
    required: true,
    default: '',
    typeOptions: {
      rows: 4,
    },
    displayOptions: show(['note', 'taskComment'], ['createNote', 'createComment']),
  },
  {
    displayName: 'Content',
    name: 'content',
    type: 'string',
    default: '',
    typeOptions: {
      rows: 4,
    },
    displayOptions: show(['note'], ['updateNote']),
    description: 'New note content',
  },
  {
    displayName: 'Parent Comment ID',
    name: 'parent_comment_id',
    type: 'string',
    default: '',
    displayOptions: show(['taskComment'], ['createComment']),
    description: 'Optional parent comment UUID when replying to a comment',
  },
  {
    displayName: 'Title',
    name: 'title',
    type: 'string',
    required: true,
    default: '',
    displayOptions: show(['task', 'taskSubtask'], ['createTask', 'createSubtask']),
    description: 'Title of the task',
  },
  {
    displayName: 'Title',
    name: 'title',
    type: 'string',
    default: '',
    displayOptions: show(['task'], ['updateTask']),
    description: 'New title for the task',
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    default: '',
    typeOptions: {
      rows: 4,
    },
    displayOptions: show(
      ['task', 'taskSubtask', 'taskTimeLog'],
      ['createTask', 'updateTask', 'createSubtask', 'createTimeLog'],
    ),
  },
  {
    displayName: 'Search',
    name: 'search',
    type: 'string',
    default: '',
    displayOptions: show(
      ['project', 'task', 'note', 'user'],
      ['listProjects', 'listTasks', 'listNotes', 'listUsers'],
    ),
    description: 'Search term',
  },
  {
    displayName: 'Tag ID',
    name: 'tag_id',
    type: 'string',
    default: '',
    displayOptions: show(['note'], ['listNotes']),
    description: 'Filter by note tag UUID, including descendant tags',
  },
  {
    displayName: 'Status',
    name: 'status',
    type: 'string',
    default: '',
    displayOptions: show(['project', 'user'], ['listProjects', 'getSprints', 'listUsers']),
    description: 'Filter by status',
  },
  {
    displayName: 'Priority',
    name: 'priority',
    type: 'options',
    default: 'medium',
    displayOptions: show(['task', 'taskSubtask'], ['createTask', 'createSubtask']),
    options: priorityOptions,
    description: 'Priority of the task',
  },
  {
    displayName: 'Priority',
    name: 'priority',
    type: 'options',
    default: '',
    displayOptions: show(['task'], ['listTasks', 'updateTask']),
    options: [anyOption, ...priorityOptions],
    description: 'Task priority',
  },
  {
    displayName: 'Type',
    name: 'type',
    type: 'options',
    default: 'task',
    displayOptions: show(['task', 'taskSubtask'], ['createTask', 'createSubtask']),
    options: taskTypeOptions,
    description: 'Task type',
  },
  {
    displayName: 'Type',
    name: 'type',
    type: 'options',
    default: '',
    displayOptions: show(['task'], ['listTasks', 'updateTask']),
    options: [anyOption, ...taskTypeOptions],
    description: 'Task type',
  },
  {
    displayName: 'Assignee ID',
    name: 'assignee_id',
    type: 'string',
    default: '',
    displayOptions: show(
      ['task', 'taskSubtask'],
      ['createTask', 'listTasks', 'updateTask', 'createSubtask'],
    ),
    description: 'Assignee UUID',
  },
  {
    displayName: 'Column ID',
    name: 'column_id',
    type: 'string',
    default: '',
    displayOptions: show(['task', 'taskSubtask'], ['createTask', 'updateTask', 'createSubtask']),
    description: 'Board column UUID. Moving into a Done column marks the task completed.',
  },
  {
    displayName: 'Sprint ID',
    name: 'sprint_id',
    type: 'string',
    default: '',
    displayOptions: show(['task', 'taskSubtask'], ['createTask', 'updateTask', 'createSubtask']),
    description: 'Sprint UUID',
  },
  {
    displayName: 'Due Date',
    name: 'due_date',
    type: 'string',
    default: '',
    placeholder: '2026-07-01',
    displayOptions: show(['task', 'taskSubtask'], ['createTask', 'updateTask', 'createSubtask']),
    description: 'Due date in YYYY-MM-DD format',
  },
  {
    displayName: 'Points',
    name: 'points',
    type: 'string',
    default: '',
    displayOptions: show(['task', 'taskSubtask'], ['createTask', 'updateTask', 'createSubtask']),
    description: 'Numeric story points for the task',
  },
  {
    displayName: 'Custom Fields JSON',
    name: 'custom_fields',
    type: 'string',
    default: '',
    typeOptions: {
      rows: 5,
    },
    displayOptions: show(['task', 'taskSubtask'], ['createTask', 'updateTask', 'createSubtask']),
    description: 'Optional custom_fields object as JSON',
  },
  {
    displayName: 'Is Completed',
    name: 'is_completed',
    type: 'options',
    default: false,
    displayOptions: show(['task'], ['updateTask']),
    options: [
      anyOption,
      {
        name: 'False',
        value: false,
      },
      {
        name: 'True',
        value: true,
      },
    ],
    description: 'Whether the task is completed',
  },
  {
    displayName: 'Connector Fields',
    name: 'connector_fields',
    type: 'collection',
    placeholder: 'Add Connector Field',
    default: {},
    displayOptions: show(['task'], ['createTask', 'updateTask']),
    options: [
      {
        displayName: 'BOS Category ID',
        name: 'daily_task_category_id',
        type: 'string',
        default: '',
        description: 'BOS daily task category remote ID',
      },
      {
        displayName: 'BOS Type ID',
        name: 'daily_task_type_id',
        type: 'string',
        default: '',
        description: 'BOS daily task type remote ID',
      },
      {
        displayName: 'Objective ID',
        name: 'objective_id',
        type: 'string',
        default: '',
        description: 'BOS objective remote ID',
      },
      {
        displayName: 'Key Results',
        name: 'key_results',
        type: 'string',
        default: '',
        description: 'Comma-separated BOS key result remote IDs',
      },
    ],
    description: 'Connector fields required when BOS is enabled',
  },
  {
    displayName: 'Hours Spent',
    name: 'hours_spent',
    type: 'number',
    required: true,
    default: 1,
    typeOptions: {
      minValue: 0,
      numberPrecision: 2,
    },
    displayOptions: show(['taskTimeLog'], ['createTimeLog']),
    description: 'Hours spent on the task',
  },
  {
    displayName: 'Log Date',
    name: 'log_date',
    type: 'string',
    required: true,
    default: '',
    placeholder: '2026-06-01',
    displayOptions: show(['taskTimeLog'], ['createTimeLog']),
    description: 'Time log date in YYYY-MM-DD format',
  },
  {
    displayName: 'Per Page',
    name: 'per_page',
    type: 'number',
    default: 20,
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    displayOptions: show(
      ['project', 'task', 'note', 'user'],
      ['listProjects', 'listTasks', 'listNotes', 'listUsers'],
    ),
    description: 'Items per page',
  },
];

export class KeloolaProjects implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Keloola Projects',
    name: 'keloolaProjects',
    icon: 'file:../../icons/keloola-projects.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Keloola Projects API',
    defaults: {
      name: 'Keloola Projects',
    },
    usableAsTool: true,
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [{ name: credentialName, required: true }],
    requestDefaults: {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'en',
      },
    },
    properties,
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const credentials = (await this.getCredentials(credentialName)) as KeloolaProjectsCredentials;
    const baseUrl = String(credentials.baseUrl || '').replace(/\/+$/, '');
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    if (!baseUrl) {
      throw new NodeOperationError(this.getNode(), 'Keloola Projects API Base URL is required');
    }

    let url = '';
    let method: IHttpRequestMethods = 'GET';
    const query: IDataObject = {};
    const body: IDataObject = {};

    if (resource === 'connectorField') {
      url = `${baseUrl}/connector-fields`;
    }

    if (resource === 'profile') {
      url = `${baseUrl}/profile`;
    }

    if (resource === 'project') {
      if (operation === 'listProjects') {
        addStringParameter(this, query, 'search');
        addStringParameter(this, query, 'status');
        query.per_page = this.getNodeParameter('per_page', 0);
        url = `${baseUrl}/projects`;
      }

      if (operation === 'getProject') {
        const projectId = requireString(this, 'project_id', 'Project ID is required');
        url = `${baseUrl}/projects/${encodeURIComponent(projectId)}`;
      }

      if (operation === 'getSprints') {
        const projectId = requireString(this, 'project_id', 'Project ID is required');
        addStringParameter(this, query, 'status');
        url = `${baseUrl}/projects/${encodeURIComponent(projectId)}/sprints`;
      }

      if (operation === 'getBoardColumns') {
        const projectId = requireString(this, 'project_id', 'Project ID is required');
        url = `${baseUrl}/projects/${encodeURIComponent(projectId)}/board-columns`;
      }

      if (operation === 'getLabels') {
        const projectId = requireString(this, 'project_id', 'Project ID is required');
        url = `${baseUrl}/projects/${encodeURIComponent(projectId)}/labels`;
      }

      if (operation === 'getSprint') {
        const sprintId = requireString(this, 'sprint_id', 'Sprint ID is required');
        url = `${baseUrl}/sprints/${encodeURIComponent(sprintId)}`;
      }
    }

    if (resource === 'user') {
      if (operation === 'listUsers') {
        addStringParameter(this, query, 'search');
        addStringParameter(this, query, 'status');
        query.per_page = this.getNodeParameter('per_page', 0);
        url = `${baseUrl}/users`;
      }

      if (operation === 'getUser') {
        const userId = requireString(this, 'user_id', 'User ID is required');
        url = `${baseUrl}/users/${encodeURIComponent(userId)}`;
      }
    }

    if (resource === 'note') {
      if (operation === 'listNotes') {
        addStringParameter(this, query, 'project_id');
        addStringParameter(this, query, 'tag_id');
        addStringParameter(this, query, 'search');
        query.per_page = this.getNodeParameter('per_page', 0);
        url = `${baseUrl}/notes`;
      }

      if (operation === 'getNote') {
        const noteId = requireString(this, 'note_id', 'Note ID is required');
        url = `${baseUrl}/notes/${encodeURIComponent(noteId)}`;
      }

      if (operation === 'createNote') {
        body.title = requireString(this, 'title', 'Title is required');
        body.content = requireString(this, 'content', 'Content is required');
        addStringParameter(this, body, 'project_id');

        method = 'POST';
        url = `${baseUrl}/notes`;
      }

      if (operation === 'updateNote') {
        const noteId = requireString(this, 'note_id', 'Note ID is required');
        addStringParameter(this, body, 'title');
        addStringParameter(this, body, 'content');

        if (!Object.keys(body).length) {
          throw new NodeOperationError(
            this.getNode(),
            'At least one field is required to update a note',
          );
        }

        method = 'PUT';
        url = `${baseUrl}/notes/${encodeURIComponent(noteId)}`;
      }

      if (operation === 'deleteNote') {
        const noteId = requireString(this, 'note_id', 'Note ID is required');
        method = 'DELETE';
        url = `${baseUrl}/notes/${encodeURIComponent(noteId)}`;
      }
    }

    if (resource === 'task') {
      if (operation === 'listTasks') {
        query.project_id = requireString(this, 'project_id', 'Project ID is required');
        query.per_page = this.getNodeParameter('per_page', 0);
        addStringParameter(this, query, 'search');
        addStringParameter(this, query, 'priority');
        addStringParameter(this, query, 'type');
        addStringParameter(this, query, 'assignee_id');

        url = `${baseUrl}/tasks`;
      }

      if (operation === 'getTaskDetail') {
        const taskId = requireString(this, 'task_id', 'Task ID is required');
        url = `${baseUrl}/tasks/${encodeURIComponent(taskId)}`;
      }

      if (operation === 'createTask') {
        body.project_id = requireString(this, 'project_id', 'Project ID is required');
        body.title = requireString(this, 'title', 'Title is required');
        body.priority = this.getNodeParameter('priority', 0) as string;
        body.type = this.getNodeParameter('type', 0) as string;
        addStringParameter(this, body, 'description');
        addStringParameter(this, body, 'assignee_id');
        addStringParameter(this, body, 'sprint_id');
        addStringParameter(this, body, 'column_id');
        addStringParameter(this, body, 'due_date');
        addNumberParameter(this, body, 'points');
        addJsonParameter(this, body, 'custom_fields');

        const connectorFields = this.getNodeParameter('connector_fields', 0, {}) as IDataObject;
        const connectorFieldsBody = buildConnectorFields(connectorFields);
        if (Object.keys(connectorFieldsBody).length) {
          body.connector_fields = connectorFieldsBody;
        }

        method = 'POST';
        url = `${baseUrl}/tasks`;
      }

      if (operation === 'updateTask') {
        const taskId = requireString(this, 'task_id', 'Task ID is required');
        addStringParameter(this, body, 'title');
        addStringParameter(this, body, 'description');
        addStringParameter(this, body, 'priority');
        addStringParameter(this, body, 'type');
        addStringParameter(this, body, 'assignee_id');
        addStringParameter(this, body, 'column_id');
        addStringParameter(this, body, 'sprint_id');
        addStringParameter(this, body, 'due_date');
        addNumberParameter(this, body, 'points');
        addJsonParameter(this, body, 'custom_fields');

        const isCompleted = this.getNodeParameter('is_completed', 0, '') as boolean | string;
        if (isCompleted !== '') {
          body.is_completed = isCompleted === true || isCompleted === 'true';
        }

        const connectorFields = this.getNodeParameter('connector_fields', 0, {}) as IDataObject;
        const connectorFieldsBody = buildConnectorFields(connectorFields);
        if (Object.keys(connectorFieldsBody).length) {
          body.connector_fields = connectorFieldsBody;
        }

        if (!Object.keys(body).length) {
          throw new NodeOperationError(
            this.getNode(),
            'At least one field is required to update a task',
          );
        }

        method = 'PUT';
        url = `${baseUrl}/tasks/${encodeURIComponent(taskId)}`;
      }

      if (operation === 'deleteTask') {
        const taskId = requireString(this, 'task_id', 'Task ID is required');
        method = 'DELETE';
        url = `${baseUrl}/tasks/${encodeURIComponent(taskId)}`;
      }
    }

    if (resource === 'taskSubtask') {
      const taskId = requireString(this, 'task_id', 'Task ID is required');

      if (operation === 'listSubtasks') {
        url = `${baseUrl}/tasks/${encodeURIComponent(taskId)}/subtasks`;
      }

      if (operation === 'createSubtask') {
        body.title = requireString(this, 'title', 'Title is required');
        body.priority = this.getNodeParameter('priority', 0) as string;
        body.type = this.getNodeParameter('type', 0) as string;
        addStringParameter(this, body, 'description');
        addStringParameter(this, body, 'assignee_id');
        addStringParameter(this, body, 'sprint_id');
        addStringParameter(this, body, 'column_id');
        addStringParameter(this, body, 'due_date');
        addNumberParameter(this, body, 'points');
        addJsonParameter(this, body, 'custom_fields');

        method = 'POST';
        url = `${baseUrl}/tasks/${encodeURIComponent(taskId)}/subtasks`;
      }
    }

    if (resource === 'taskComment') {
      const taskId = requireString(this, 'task_id', 'Task ID is required');

      if (operation === 'listComments') {
        url = `${baseUrl}/tasks/${encodeURIComponent(taskId)}/comments`;
      }

      if (operation === 'createComment') {
        body.content = requireString(this, 'content', 'Content is required');
        addStringParameter(this, body, 'parent_comment_id');

        method = 'POST';
        url = `${baseUrl}/tasks/${encodeURIComponent(taskId)}/comments`;
      }
    }

    if (resource === 'taskTimeLog') {
      const taskId = requireString(this, 'task_id', 'Task ID is required');

      if (operation === 'listTimeLogs') {
        url = `${baseUrl}/tasks/${encodeURIComponent(taskId)}/time-logs`;
      }

      if (operation === 'createTimeLog') {
        body.hours_spent = this.getNodeParameter('hours_spent', 0);
        body.log_date = requireString(this, 'log_date', 'Log Date is required');
        addStringParameter(this, body, 'description');

        method = 'POST';
        url = `${baseUrl}/tasks/${encodeURIComponent(taskId)}/time-logs`;
      }
    }

    if (resource === 'userApiToken') {
      const userId = requireString(this, 'user_id', 'User ID is required');

      if (operation === 'listApiTokens') {
        url = `${baseUrl}/users/${encodeURIComponent(userId)}/api-tokens`;
      }

      if (operation === 'createApiToken') {
        body.name = requireString(this, 'token_name', 'Token Name is required');
        body.abilities = splitCsv(requireString(this, 'abilities', 'Abilities are required'));
        addStringParameter(this, body, 'expires_at');

        method = 'POST';
        url = `${baseUrl}/users/${encodeURIComponent(userId)}/api-tokens`;
      }

      if (operation === 'deleteApiToken') {
        const tokenId = requireString(this, 'token_id', 'Token ID is required');
        method = 'DELETE';
        url = `${baseUrl}/users/${encodeURIComponent(userId)}/api-tokens/${encodeURIComponent(tokenId)}`;
      }
    }

    if (!url) {
      throw new NodeOperationError(this.getNode(), `No operation found for ${resource}`);
    }

    try {
      const response = await this.helpers.httpRequestWithAuthentication.call(this, credentialName, {
        method,
        url,
        qs: query,
        body: Object.keys(body).length ? body : undefined,
        headers: {
          'Accept-Language': 'en',
        },
        json: true,
      });

      return [this.helpers.returnJsonArray(response)];
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const httpError = error as {
          message?: string;
          response: {
            data?: unknown;
            status?: number;
          };
        };

        throw new NodeOperationError(
          this.getNode(),
          `${JSON.stringify(httpError.response.data || httpError.message)}`,
          {
            description: `Status: ${httpError.response.status}\nMethod: ${method}\nURL: ${url}\nQuery: ${JSON.stringify(query, null, 2)}\nBody: ${JSON.stringify(body, null, 2)}`,
          },
        );
      }

      if (this.continueOnFail()) {
        return [
          this.helpers.returnJsonArray({
            error: error instanceof Error ? error.message : String(error),
          }),
        ];
      }

      throw new NodeOperationError(
        this.getNode(),
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
