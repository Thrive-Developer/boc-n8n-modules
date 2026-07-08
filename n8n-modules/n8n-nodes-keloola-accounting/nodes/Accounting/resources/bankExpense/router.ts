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
      url = `${ENV.ACCOUNTING_BASE_URL}/banks/transactions`;
      method = 'POST';
      body = {
        id: executeFunctions.getNodeParameter('bankAccountId', 0) as string,
        page: executeFunctions.getNodeParameter('page', 0, 1) as number,
        sort: executeFunctions.getNodeParameter('sort', 0, 'desc') as string,
      };
      break;

    case operations.create.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/banks/expense`;
      method = 'POST';
      body = {
        type: executeFunctions.getNodeParameter('type', 0) as string,
        from: executeFunctions.getNodeParameter('from', 0) as string,
        to: executeFunctions.getNodeParameter('to', 0) as string,
        recipient: executeFunctions.getNodeParameter('recipient', 0) as string,
        date: executeFunctions.getNodeParameter('date', 0) as string,
        amount: executeFunctions.getNodeParameter('amount', 0) as number,
        currency: executeFunctions.getNodeParameter('currency', 0) as string,
        tax_id: executeFunctions.getNodeParameter('tax_id', 0) as string,
        transaction_number: executeFunctions.getNodeParameter('transaction_number', 0) as string,
        reference: executeFunctions.getNodeParameter('reference', 0) as string,
        description: executeFunctions.getNodeParameter('description', 0) as string,
      };
      break;

    case operations.get.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/banks/expense/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'GET';
      break;

    case operations.update.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/banks/expense/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'POST';
      body = {
        from: executeFunctions.getNodeParameter('from', 0) as string,
        to: executeFunctions.getNodeParameter('to', 0) as string,
        recipient: executeFunctions.getNodeParameter('recipient', 0) as string,
        date: executeFunctions.getNodeParameter('date', 0) as string,
        amount: executeFunctions.getNodeParameter('amount', 0) as number,
        currency: executeFunctions.getNodeParameter('currency', 0) as string,
        tax_id: executeFunctions.getNodeParameter('tax_id', 0) as string,
        transaction_number: executeFunctions.getNodeParameter('transaction_number', 0) as string,
        reference: executeFunctions.getNodeParameter('reference', 0) as string,
        description: executeFunctions.getNodeParameter('description', 0) as string,
      };
      break;

    case operations.delete.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/banks/expense/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'DELETE';
      break;

    default:
      url = '';
      method = 'GET';
      break;
  }

  return { url, method, body };
}
