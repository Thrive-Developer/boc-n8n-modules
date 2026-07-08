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
      url = `${ENV.ACCOUNTING_BASE_URL}/sale-delivery`;
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
      url = `${ENV.ACCOUNTING_BASE_URL}/sale-delivery/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'GET';
      break;

    case operations.delete.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/sale-delivery/delete/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'DELETE';
      break;

    case operations.release.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/sale-delivery/release/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'POST';
      break;

    case operations.markArrived.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/sale-delivery/arrived/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'POST';
      break;

    case operations.startDelivery.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/sale-delivery/start/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'PUT';
      break;

    case operations.create.value:
    case operations.update.value: {
      const id =
        operation === operations.update.value ? executeFunctions.getNodeParameter('id', 0) : '';
      url =
        operation === operations.create.value
          ? `${ENV.ACCOUNTING_BASE_URL}/sale-delivery`
          : `${ENV.ACCOUNTING_BASE_URL}/sale-delivery/${id}`;
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
      const draft = executeFunctions.getNodeParameter('draft', 0) as boolean;

      body = {
        transaction_date: executeFunctions.getNodeParameter('transaction_date', 0),
        shipping_date: executeFunctions.getNodeParameter('shipping_date', 0),
        expiry_date: executeFunctions.getNodeParameter('expiry_date', 0),
        order_id: executeFunctions.getNodeParameter('order_id', 0),
        customer: executeFunctions.getNodeParameter('customer', 0),
        draft,
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
