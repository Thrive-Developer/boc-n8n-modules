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
        url: `${this.getNode().parameters.accountingBaseUrl || '={{$parameter["requestDefaults"]["baseURL"]}}'}/sale-payment`,
        qs,
        json: true,
      });
      responseData = response.data || response;
      break;
    }

    case operations.create.value: {
      const customer = this.getNodeParameter('customer', 0) as string;
      const depositTo = this.getNodeParameter('deposit_to', 0) as string;
      const invoiceFrom = this.getNodeParameter('invoice_from', 0) as string;
      const invoiceDate = this.getNodeParameter('invoice_date', 0) as string;
      const paymentDate = this.getNodeParameter('payment_date', 0) as string;
      const dueDate = this.getNodeParameter('due_date', 0) as string;
      const currency = this.getNodeParameter('currency', 0) as string;
      const invoices = this.getNodeParameter('invoices', 0) as IDataObject;
      const additionalFields = this.getNodeParameter('additionalFields', 0) as IDataObject;

      const body: IDataObject = {
        customer,
        deposit_to: depositTo,
        invoice_from: invoiceFrom,
        invoice_date: invoiceDate.split('T')[0],
        payment_date: paymentDate.split('T')[0],
        due_date: dueDate.split('T')[0],
        currency,
        invoices: invoices.item,
        ...additionalFields,
      };

      const response = await this.helpers.httpRequest({
        method: 'POST',
        url: `${this.getNode().parameters.accountingBaseUrl || '={{$parameter["requestDefaults"]["baseURL"]}}'}/sale-payment`,
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
        url: `${this.getNode().parameters.accountingBaseUrl || '={{$parameter["requestDefaults"]["baseURL"]}}'}/sale-payment/${id}`,
        json: true,
      });
      responseData = response.data || response;
      break;
    }

    case operations.update.value: {
      const id = this.getNodeParameter('id', 0) as string;
      const customer = this.getNodeParameter('customer', 0) as string;
      const depositTo = this.getNodeParameter('deposit_to', 0) as string;
      const invoiceFrom = this.getNodeParameter('invoice_from', 0) as string;
      const invoiceDate = this.getNodeParameter('invoice_date', 0) as string;
      const paymentDate = this.getNodeParameter('payment_date', 0) as string;
      const dueDate = this.getNodeParameter('due_date', 0) as string;
      const currency = this.getNodeParameter('currency', 0) as string;
      const invoices = this.getNodeParameter('invoices', 0) as IDataObject;
      const additionalFields = this.getNodeParameter('additionalFields', 0) as IDataObject;

      const body: IDataObject = {
        customer,
        deposit_to: depositTo,
        invoice_from: invoiceFrom,
        invoice_date: invoiceDate.split('T')[0],
        payment_date: paymentDate.split('T')[0],
        due_date: dueDate.split('T')[0],
        currency,
        invoices: invoices.item,
        ...additionalFields,
      };

      const response = await this.helpers.httpRequest({
        method: 'PUT',
        url: `${this.getNode().parameters.accountingBaseUrl || '={{$parameter["requestDefaults"]["baseURL"]}}'}/sale-payment/${id}`,
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
        url: `${this.getNode().parameters.accountingBaseUrl || '={{$parameter["requestDefaults"]["baseURL"]}}'}/sale-payment/delete/${id}`,
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
        url: `${this.getNode().parameters.accountingBaseUrl || '={{$parameter["requestDefaults"]["baseURL"]}}'}/sale-payment/print/${id}`,
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
