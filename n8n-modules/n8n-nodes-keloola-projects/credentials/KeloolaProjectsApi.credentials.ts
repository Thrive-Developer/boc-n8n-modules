import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  Icon,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class KeloolaProjectsApi implements ICredentialType {
  name = 'keloolaProjectsApi';
  displayName = 'Keloola Projects API';
  icon = 'file:../icons/keloola.svg' as Icon;
  documentationUrl =
    'https://github.com/Thrive-Developer/keloola-n8n-modules/tree/main/n8n-modules/n8n-nodes-keloola-projects#credentials';

  properties: INodeProperties[] = [
    {
      displayName: 'API Base URL',
      name: 'baseUrl',
      type: 'string',
      required: true,
      default: 'https://api-pm.keloola.co/api/v1/external',
      placeholder: 'https://api-pm.keloola.co/api/v1/external',
      description: 'Base URL for the Keloola Projects API',
    },
    {
      displayName: 'Access Token',
      name: 'accessToken',
      type: 'string',
      required: true,
      typeOptions: { password: true },
      default: '',
      description: 'Bearer token used to authenticate Keloola Projects API requests',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        Accept: 'application/json',
        Authorization: '=Bearer {{$credentials.accessToken}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      method: 'GET',
      url: '={{$credentials.baseUrl}}/projects',
      headers: {
        'Accept-Language': 'en',
      },
    },
  };
}
