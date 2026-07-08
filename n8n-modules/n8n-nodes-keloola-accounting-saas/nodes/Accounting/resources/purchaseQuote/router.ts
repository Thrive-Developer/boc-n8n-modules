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
      url = `${ENV.ACCOUNTING_BASE_URL}/purchase-quote`;
      method = 'GET';
      const page = executeFunctions.getNodeParameter('page', 0) as number;
      const perPage = executeFunctions.getNodeParameter('per_page', 0) as number;
      const search = executeFunctions.getNodeParameter('search', 0) as string;

      url += `?page=${page}&per_page=${perPage}`;
      if (search) {
        url += `&search=${search}`;
      }
      break;
    }

    case operations.get.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/purchase-quote/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'GET';
      break;

    case operations.delete.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/purchase-quote/delete/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'DELETE';
      break;

    case operations.send.value: {
      url = `${ENV.ACCOUNTING_BASE_URL}/purchase-quote/send/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'POST';
      const to = executeFunctions.getNodeParameter('to', 0) as string;
      const cc = executeFunctions.getNodeParameter('cc', 0) as string;
      const message = executeFunctions.getNodeParameter('message', 0) as string;
      body = {
        to: to.split(',').map((email) => email.trim()),
        cc: cc ? cc.split(',').map((email) => email.trim()) : undefined,
        message,
      };
      break;
    }

    case operations.print.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/purchase-quote/print/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'POST';
      body = {
        template: executeFunctions.getNodeParameter('template', 0) as string,
        preview_type: executeFunctions.getNodeParameter('preview_type', 0) as string,
      };
      break;

    case operations.create.value:
    case operations.update.value: {
      const id =
        operation === operations.update.value ? executeFunctions.getNodeParameter('id', 0) : '';
      url =
        operation === operations.create.value
          ? `${ENV.ACCOUNTING_BASE_URL}/purchase-quote`
          : `${ENV.ACCOUNTING_BASE_URL}/purchase-quote/${id}`;
      method = operation === operations.create.value ? 'POST' : 'PUT';

      const productsCollection = executeFunctions.getNodeParameter('products', 0) as IDataObject;
      const products = (productsCollection.item as IDataObject[]) || [];

      for (const product of products) {
        const taxId = (product.tax_id as string) ?? '';
        if (taxId) {
          product.tax_id = taxId.split(',').map((id) => id.trim());
        }
      }

      const additionalFields = executeFunctions.getNodeParameter(
        'additionalFields',
        0,
      ) as IDataObject;

      body = {
        transaction_date: executeFunctions.getNodeParameter('transaction_date', 0),
        expiry_date: executeFunctions.getNodeParameter('expiry_date', 0),
        vendor: executeFunctions.getNodeParameter('vendor', 0),
        products: JSON.stringify(products),
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
