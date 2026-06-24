import type {
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export const WAZUH_INDEXER_API_CREDENTIAL_NAME = 'wazuhIndexerApi';

export interface WazuhIndexerApiCredentials extends ICredentialDataDecryptedObject {
	baseUrl: string;
	port: number;
	username: string;
	password: string;
	allowUnauthorizedCerts: boolean;
}

function assertRequiredString(value: unknown, fieldName: string): asserts value is string {
	if (typeof value !== 'string' || value.trim() === '') {
		throw new Error(`${fieldName} is required`);
	}
}

function assertRequiredPort(value: unknown): asserts value is number | string {
	if (value === undefined || value === null || value === '') {
		throw new Error('Port is required');
	}

	const port = Number(value);

	if (!Number.isInteger(port) || port < 1 || port > 65535) {
		throw new Error('Port must be a valid TCP port number');
	}
}

function normalizeBaseUrl(baseUrl: string): string {
	const trimmedBaseUrl = baseUrl.trim().replace(/\/+$/, '');

	if (!/^https?:\/\//i.test(trimmedBaseUrl)) {
		throw new Error('Base URL must include http:// or https://');
	}

	try {
		const url = new URL(trimmedBaseUrl);
		url.port = '';

		return url.toString().replace(/\/+$/, '');
	} catch {
		throw new Error('Base URL must be a valid HTTP or HTTPS URL');
	}
}

export function validateWazuhIndexerApiCredentials(
	credentials: ICredentialDataDecryptedObject,
): WazuhIndexerApiCredentials {
	assertRequiredString(credentials.host, 'Base URL');
	assertRequiredPort(credentials.port);
	assertRequiredString(credentials.username, 'Username');
	assertRequiredString(credentials.password, 'Password');

	return {
		baseUrl: normalizeBaseUrl(credentials.host),
		port: Number(credentials.port),
		username: credentials.username,
		password: credentials.password,
		allowUnauthorizedCerts: Boolean(credentials.allowUnauthorizedCerts),
	};
}

export function getIndexerBaseUrl(credentials: WazuhIndexerApiCredentials): string {
	return `${credentials.baseUrl}:${credentials.port}`;
}

export class WazuhIndexerApi implements ICredentialType {
	name = 'wazuhIndexerApi';

	displayName = 'Wazuh Indexer API';

	icon: Icon = 'file:../icons/boc.svg';

	documentationUrl = 'https://documentation.wazuh.com/current/user-manual/indexer-api/getting-started.html';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'host',
			type: 'string',
			default: '',
			placeholder: 'https://wazuh-indexer.example.com',
			required: true,
			description:
				'Wazuh Indexer API base URL including protocol, without port, for example https://wazuh-indexer.example.com or http://172.16.12.185.',
		},
		{
			displayName: 'Port',
			name: 'port',
			type: 'number',
			default: 9200,
			required: true,
			description: 'Port exposed by the Wazuh Indexer API.',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			required: true,
			description: 'Wazuh Indexer API username used for Basic Authentication.',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Wazuh Indexer API password used for Basic Authentication.',
		},
		// eslint-disable-next-line @n8n/community-nodes/credential-password-field
		{
			displayName: 'Allow Unauthorized Certs',
			name: 'allowUnauthorizedCerts',
			type: 'boolean',
			default: false,
			description: 'Allow self-signed or invalid SSL certificates',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			baseURL:
				'={{$credentials.host.replace(/\\/+$/, "").replace(/:\\d+$/, "") + ":" + $credentials.port}}',
			url: '/',
			auth: {
				username: '={{$credentials.username}}',
				password: '={{$credentials.password}}',
			},
			json: true,
			skipSslCertificateValidation: '={{$credentials.allowUnauthorizedCerts}}',
		},
	};
}
