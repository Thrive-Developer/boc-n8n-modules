import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { operations } from './index';

export async function router(this: IExecuteFunctions): Promise<IDataObject[]> {
  const operation = this.getNodeParameter('operation', 0) as string;
  let responseData: IDataObject[] = [];

  switch (operation) {
    case operations.getAll.value: {
      const page = this.getNodeParameter('page', 0) as number;
      const perPage = this.getNodeParameter('per_page', 0) as number;
      const search = this.getNodeParameter('search', 0) as string;
      const sort = this.getNodeParameter('sort', 0) as string;

      const qs: IDataObject = {
        page,
        per_page: perPage,
        sort,
      };

      if (search) {
        qs.search = search;
      }

      const response = await this.helpers.httpRequest({
        method: 'GET',
        url: `${this.getNode().parameters.accountingBaseUrl || '={{$parameter["requestDefaults"]["baseURL"]}}'}/purchase-return`,
        qs,
        json: true,
      });
      responseData = response.data || response;
      break;
    }

    case operations.create.value: {
      const invoiceId = this.getNodeParameter('invoice_id', 0) as string;
      const returnDate = this.getNodeParameter('return_date', 0) as string;
      const products = this.getNodeParameter('products', 0) as IDataObject;
      const additionalFields = this.getNodeParameter('additionalFields', 0) as IDataObject;

      const body: IDataObject = {
        invoice_id: invoiceId,
        return_date: returnDate.split('T')[0],
        products: products.item,
        ...additionalFields,
      };

      const response = await this.helpers.httpRequest({
        method: 'POST',
        url: `${this.getNode().parameters.accountingBaseUrl || '={{$parameter["requestDefaults"]["baseURL"]}}'}/purchase-return`,
        body,
        json: true,
      });
      responseData = response.data || response;
      break;
    }

    case operations.get.value: {
      const id = this.getNodeParameter('id', 0) as string;
      const response = await this.helpers.httpRequest({
        method: 'GET',
        url: `${this.getNode().parameters.accountingBaseUrl || '={{$parameter["requestDefaults"]["baseURL"]}}'}/purchase-return/${id}`,
        json: true,
      });
      responseData = response.data || response;
      break;
    }

    case operations.update.value: {
      const id = this.getNodeParameter('id', 0) as string;
      const invoiceId = this.getNodeParameter('invoice_id', 0) as string;
      const returnDate = this.getNodeParameter('return_date', 0) as string;
      const products = this.getNodeParameter('products', 0) as IDataObject;
      const additionalFields = this.getNodeParameter('additionalFields', 0) as IDataObject;

      const body: IDataObject = {
        invoice_id: invoiceId,
        return_date: returnDate.split('T')[0],
        products: products.item,
        ...additionalFields,
      };

      const response = await this.helpers.httpRequest({
        method: 'PUT',
        url: `${this.getNode().parameters.accountingBaseUrl || '={{$parameter["requestDefaults"]["baseURL"]}}'}/purchase-return/${id}`,
        body,
        json: true,
      });
      responseData = response.data || response;
      break;
    }

    case operations.delete.value: {
      const id = this.getNodeParameter('id', 0) as string;
      const response = await this.helpers.httpRequest({
        method: 'DELETE',
        url: `${this.getNode().parameters.accountingBaseUrl || '={{$parameter["requestDefaults"]["baseURL"]}}'}/purchase-return/delete/${id}`,
        json: true,
      });
      responseData = response.data || response;
      break;
    }

    case operations.print.value: {
      const id = this.getNodeParameter('id', 0) as string;
      const template = this.getNodeParameter('template', 0) as string;
      const previewType = this.getNodeParameter('preview_type', 0) as string;

      const body: IDataObject = {
        template,
        preview_type: previewType,
      };

      const response = await this.helpers.httpRequest({
        method: 'POST',
        url: `${this.getNode().parameters.accountingBaseUrl || '={{$parameter["requestDefaults"]["baseURL"]}}'}/purchase-return/print/${id}`,
        body,
        json: true,
      });
      responseData = response.data || response;
      break;
    }

    case operations.send.value: {
      const id = this.getNodeParameter('id', 0) as string;
      const to = this.getNodeParameter('to', 0) as string;
      const cc = this.getNodeParameter('cc', 0) as string;
      const message = this.getNodeParameter('message', 0) as string;

      const body: IDataObject = {
        to: to.split(',').map((email) => email.trim()),
        cc: cc ? cc.split(',').map((email) => email.trim()) : undefined,
        message,
      };

      const response = await this.helpers.httpRequest({
        method: 'POST',
        url: `${this.getNode().parameters.accountingBaseUrl || '={{$parameter["requestDefaults"]["baseURL"]}}'}/purchase-return/send/${id}`,
        body,
        json: true,
      });
      responseData = response.data || response;
      break;
    }

    default:
      throw new Error(`The operation "${operation}" is not supported!`);
  }

  return Array.isArray(responseData) ? responseData : [responseData];
}
