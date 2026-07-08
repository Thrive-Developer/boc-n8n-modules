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

      const queryParams = new URLSearchParams();
      if (page) queryParams.append('page', page.toString());
      if (perPage) queryParams.append('per_page', perPage.toString());
      if (search) queryParams.append('search', search);

      url = `${ENV.ACCOUNTING_BASE_URL}/product-service?${queryParams.toString()}`;
      method = 'GET';
      break;
    }

    case operations.create.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/product-service`;
      method = 'POST';
      body = {
        name: executeFunctions.getNodeParameter('name', 0) as string,
        sku: executeFunctions.getNodeParameter('sku', 0) as string,
        category_id: executeFunctions.getNodeParameter('category_id', 0) as number,
        unit_id: executeFunctions.getNodeParameter('unit_id', 0) as number,
        description: executeFunctions.getNodeParameter('description', 0) as string,
        sale_price: executeFunctions.getNodeParameter('sale_price', 0) as number,
        purchase_price: executeFunctions.getNodeParameter('purchase_price', 0) as number,
        is_sale: executeFunctions.getNodeParameter('is_sale', 0) as boolean,
        is_purchase: executeFunctions.getNodeParameter('is_purchase', 0) as boolean,
        purchase_account: executeFunctions.getNodeParameter('purchase_account', 0) as string,
        sale_account: executeFunctions.getNodeParameter('sale_account', 0) as string,
      };
      break;

    case operations.get.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/product-service/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'GET';
      break;

    case operations.update.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/product-service/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'PUT';
      body = {
        name: executeFunctions.getNodeParameter('name', 0) as string,
        sku: executeFunctions.getNodeParameter('sku', 0) as string,
        category_id: executeFunctions.getNodeParameter('category_id', 0) as number,
        unit_id: executeFunctions.getNodeParameter('unit_id', 0) as number,
        description: executeFunctions.getNodeParameter('description', 0) as string,
        sale_price: executeFunctions.getNodeParameter('sale_price', 0) as number,
        purchase_price: executeFunctions.getNodeParameter('purchase_price', 0) as number,
        is_sale: executeFunctions.getNodeParameter('is_sale', 0) as boolean,
        is_purchase: executeFunctions.getNodeParameter('is_purchase', 0) as boolean,
        purchase_account: executeFunctions.getNodeParameter('purchase_account', 0) as string,
        sale_account: executeFunctions.getNodeParameter('sale_account', 0) as string,
      };
      break;

    case operations.delete.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/product-service/delete/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'DELETE';
      break;

    default:
      url = '';
      method = 'GET';
      break;
  }

  return { url, method, body };
}
