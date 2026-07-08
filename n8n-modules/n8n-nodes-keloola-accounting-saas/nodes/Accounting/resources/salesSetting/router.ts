import { IExecuteFunctions, IDataObject, IHttpRequestMethods } from 'n8n-workflow';
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
    case operations.get.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/sales-settings`;
      method = 'GET';
      break;

    case operations.update.value: {
      url = `${ENV.ACCOUNTING_BASE_URL}/sales-settings`;
      method = 'POST';
      const additionalFields = executeFunctions.getNodeParameter(
        'additionalFields',
        0,
      ) as IDataObject;
      body = {
        discount: executeFunctions.getNodeParameter('discount', 0) as boolean,
        salesOrderApproval: executeFunctions.getNodeParameter('salesOrderApproval', 0) as boolean,
        ...additionalFields,
      };
      break;
    }

    default:
      url = '';
      method = 'GET';
      break;
  }

  return { url, method, body };
}
