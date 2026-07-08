import { IExecuteFunctions, IHttpRequestMethods, IDataObject } from 'n8n-workflow';
import { ENV } from '../../../../env';
import { operations } from './index';

export async function router(
  executeFunctions: IExecuteFunctions,
  operation: string,
): Promise<{ url: string; method: IHttpRequestMethods; body: IDataObject }> {
  let url = '';
  let method: IHttpRequestMethods = 'GET';
  const body: IDataObject = {};

  switch (operation) {
    case operations.getAll.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/banks?per_page=1000`;
      method = 'GET';
      break;

    default:
      url = '';
      method = 'GET';
      break;
  }

  return { url, method, body };
}
