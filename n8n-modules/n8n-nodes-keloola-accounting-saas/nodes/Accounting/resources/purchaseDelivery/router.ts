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
      url = `${ENV.ACCOUNTING_BASE_URL}/purchase-delivery`;
      method = 'GET';
      const page = executeFunctions.getNodeParameter('page', 0) as number;
      const perPage = executeFunctions.getNodeParameter('per_page', 0) as number;
      const search = executeFunctions.getNodeParameter('search', 0) as string;
      const status = executeFunctions.getNodeParameter('status', 0) as string;

      url += `?page=${page}&per_page=${perPage}`;
      if (search) {
        url += `&search=${search}`;
      }
      if (status && status !== 'all') {
        url += `&status=${status}`;
      }
      break;
    }

    case operations.get.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/purchase-delivery/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'GET';
      break;

    case operations.create.value: {
      url = `${ENV.ACCOUNTING_BASE_URL}/purchase-delivery`;
      method = 'POST';

      const productsCollection = executeFunctions.getNodeParameter('products', 0) as IDataObject;
      const products = (productsCollection.item as IDataObject[]) || [];

      const additionalFields = executeFunctions.getNodeParameter(
        'additionalFields',
        0,
      ) as IDataObject;

      body = {
        order_id: executeFunctions.getNodeParameter('order_id', 0),
        vendor: executeFunctions.getNodeParameter('vendor', 0),
        shipping_date: executeFunctions.getNodeParameter('shipping_date', 0),
        arrival_date: executeFunctions.getNodeParameter('arrival_date', 0),
        shipping_via: executeFunctions.getNodeParameter('shipping_via', 0),
        tracking_number: executeFunctions.getNodeParameter('tracking_number', 0),
        products: JSON.stringify(products),
        ...additionalFields,
      };
      break;
    }

    case operations.createGrn.value: {
      url = `${ENV.ACCOUNTING_BASE_URL}/purchase-delivery/create-grn`;
      method = 'POST';

      const grnProductsCollection = executeFunctions.getNodeParameter(
        'grn_products',
        0,
      ) as IDataObject;
      const grnProducts = (grnProductsCollection.item as IDataObject[]) || [];

      body = {
        received_date: executeFunctions.getNodeParameter('received_date', 0),
        vendor: executeFunctions.getNodeParameter('vendor', 0),
        products: grnProducts,
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
