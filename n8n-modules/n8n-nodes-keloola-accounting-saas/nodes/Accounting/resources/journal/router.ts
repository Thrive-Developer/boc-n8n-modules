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
      const page = executeFunctions.getNodeParameter('page', 0) as number;
      const perPage = executeFunctions.getNodeParameter('per_page', 0) as number;
      const search = executeFunctions.getNodeParameter('search', 0) as string;
      const sort = executeFunctions.getNodeParameter('sort', 0) as string;

      const queryParams = new URLSearchParams();
      if (page) queryParams.append('page', page.toString());
      if (perPage) queryParams.append('per_page', perPage.toString());
      if (search) queryParams.append('search', search);
      if (sort) queryParams.append('sort', sort);

      url = `${ENV.ACCOUNTING_BASE_URL}/journal-entries?${queryParams.toString()}`;
      method = 'GET';
      break;
    }

    case operations.create.value: {
      url = `${ENV.ACCOUNTING_BASE_URL}/journal-entries`;
      method = 'POST';

      const detailsCollection = executeFunctions.getNodeParameter('details', 0) as IDataObject;
      const details = (detailsCollection.detail_item as IDataObject[]) || [];

      const currency = executeFunctions.getNodeParameter('currency', 0, '') as string;

      body = {
        transaction_number: executeFunctions.getNodeParameter('transaction_number', 0) as string,
        date: executeFunctions.getNodeParameter('date', 0) as string,
        reference: executeFunctions.getNodeParameter('reference', 0) as string,
        description: executeFunctions.getNodeParameter('description', 0) as string,
        force_of_saving: executeFunctions.getNodeParameter('force_posting', 0) as boolean,
        details: details,
      };

      if (currency) {
        body.currency = currency;
      }
      break;
    }

    case operations.get.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/journal-entries/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'GET';
      break;

    case operations.update.value: {
      url = `${ENV.ACCOUNTING_BASE_URL}/journal-entries/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'PUT';

      const detailsCollection = executeFunctions.getNodeParameter('details', 0) as IDataObject;
      const details = (detailsCollection.detail_item as IDataObject[]) || [];

      const currency = executeFunctions.getNodeParameter('currency', 0, '') as string;

      body = {
        transaction_number: executeFunctions.getNodeParameter('transaction_number', 0) as string,
        date: executeFunctions.getNodeParameter('date', 0) as string,
        reference: executeFunctions.getNodeParameter('reference', 0) as string,
        description: executeFunctions.getNodeParameter('description', 0) as string,
        force_of_saving: executeFunctions.getNodeParameter('force_posting', 0) as boolean,
        details: details,
      };

      if (currency) {
        body.currency = currency;
      }
      break;
    }

    case operations.delete.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/journal-entries/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'DELETE';
      break;

    default:
      url = '';
      method = 'GET';
      break;
  }

  return { url, method, body };
}
