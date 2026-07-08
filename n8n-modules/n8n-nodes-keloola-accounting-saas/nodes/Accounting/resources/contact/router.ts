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
    case operations.getAll.value: {
      url = `${ENV.ACCOUNTING_BASE_URL}/contact`;
      method = 'GET';
      const page = executeFunctions.getNodeParameter('page', 0) as number;
      const perPage = executeFunctions.getNodeParameter('per_page', 0) as number;
      const search = executeFunctions.getNodeParameter('search', 0) as string;
      const contactType = executeFunctions.getNodeParameter('contact_type', 0) as string;

      url += `?page=${page}&per_page=${perPage}&contact_type=${contactType}`;
      if (search) {
        url += `&search=${search}`;
      }
      break;
    }

    case operations.get.value: {
      const id = executeFunctions.getNodeParameter('id', 0) as string;
      url = `${ENV.ACCOUNTING_BASE_URL}/contact/${id}`;
      method = 'GET';
      break;
    }

    case operations.create.value:
    case operations.update.value: {
      const recordId =
        operation === operations.update.value ? executeFunctions.getNodeParameter('id', 0) : '';
      url =
        operation === operations.create.value
          ? `${ENV.ACCOUNTING_BASE_URL}/contact`
          : `${ENV.ACCOUNTING_BASE_URL}/contact/${recordId}`;
      method = operation === operations.create.value ? 'POST' : 'PUT';

      const additionalFields = executeFunctions.getNodeParameter(
        'additionalFields',
        0,
      ) as IDataObject;

      body = {
        name: executeFunctions.getNodeParameter('name', 0),
        email: executeFunctions.getNodeParameter('email', 0),
        contact_type: executeFunctions.getNodeParameter('contact_type', 0),
        ...additionalFields,
      };
      break;
    }

    case operations.delete.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/contact/delete/${executeFunctions.getNodeParameter('id', 0)}?contact_type=${executeFunctions.getNodeParameter('contact_type', 0)}`;
      method = 'DELETE';
      break;

    default:
      url = '';
      method = 'GET';
      break;
  }

  return { url, method, body };
}
