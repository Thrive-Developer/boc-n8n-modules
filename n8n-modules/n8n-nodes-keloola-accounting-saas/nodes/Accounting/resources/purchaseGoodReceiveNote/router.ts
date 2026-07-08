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
      url = `${ENV.ACCOUNTING_BASE_URL}/purchase-delivery/good-receive-notes`;
      method = 'GET';
      const page = executeFunctions.getNodeParameter('page', 0) as number;
      const perPage = executeFunctions.getNodeParameter('per_page', 0) as number;
      const search = executeFunctions.getNodeParameter('search', 0) as string;
      const purchaseId = executeFunctions.getNodeParameter('purchase_id', 0) as string;

      url += `?page=${page}&per_page=${perPage}`;
      if (search) {
        url += `&search=${search}`;
      }
      if (purchaseId) {
        url += `&purchase_id=${purchaseId}`;
      }
      break;
    }

    case operations.get.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/purchase-delivery/good-receive-notes/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'GET';
      break;

    case operations.create.value: {
      const pId = executeFunctions.getNodeParameter('purchase_id', 0) as string;
      url = `${ENV.ACCOUNTING_BASE_URL}/purchase-delivery/${pId}/good-receive-notes`;
      method = 'POST';

      const productsCollection = executeFunctions.getNodeParameter('products', 0) as IDataObject;
      const products = (productsCollection.item as IDataObject[]) || [];

      body = {
        stock_officer_id: executeFunctions.getNodeParameter('stock_officer_id', 0),
        received_date: executeFunctions.getNodeParameter('received_date', 0),
        products: JSON.stringify(products),
      };
      break;
    }

    case operations.handleDiscrepancy.value: {
      const purchase = executeFunctions.getNodeParameter('purchase_id', 0) as string;
      const grnId = executeFunctions.getNodeParameter('id', 0) as string;
      url = `${ENV.ACCOUNTING_BASE_URL}/purchase-delivery/${purchase}/good-receive-notes/${grnId}/handle-discrepancy`;
      method = 'POST';
      body = {
        reason: executeFunctions.getNodeParameter('reason', 0) as string,
        action: executeFunctions.getNodeParameter('action', 0) as string,
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
