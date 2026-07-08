import { IExecuteFunctions, IHttpRequestMethods, IDataObject } from 'n8n-workflow';
import { ENV } from '../../../../env';
import { operations } from './index';

export async function router(
  executeFunctions: IExecuteFunctions,
  operation: string,
): Promise<{ url: string; method: IHttpRequestMethods; body: IDataObject }> {
  let url = '';
  let method: IHttpRequestMethods = 'GET';
  let body: IDataObject = {};

  switch (operation) {
    case operations.getAll.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/accounting-setup/product-unit`;
      method = 'GET';
      break;

    case operations.create.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/accounting-setup/product-unit`;
      method = 'POST';
      body = {
        name: executeFunctions.getNodeParameter('name', 0) as string,
      };
      break;

    case operations.get.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/accounting-setup/product-unit/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'GET';
      break;

    case operations.update.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/accounting-setup/product-unit/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'PUT';
      body = {
        name: executeFunctions.getNodeParameter('name', 0) as string,
      };
      break;

    case operations.delete.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/accounting-setup/product-unit/delete/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'DELETE';
      break;

    default:
      url = '';
      method = 'GET';
      break;
  }

  return { url, method, body };
}
