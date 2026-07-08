import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { operations } from './index';

export async function router(this: IExecuteFunctions): Promise<IDataObject[]> {
  const operation = this.getNodeParameter('operation', 0) as string;
  let responseData: IDataObject[] = [];
  const accountingBaseUrl =
    this.getNode().parameters.accountingBaseUrl || '={{$parameter["requestDefaults"]["baseURL"]}}';

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
        url: `${accountingBaseUrl}/sale-down-payment`,
        qs,
        json: true,
      });
      responseData = response.data || response;
      break;
    }

    case operations.create.value: {
      const saleOrderId = this.getNodeParameter('sale_order_id', 0) as string;
      const dueDate = this.getNodeParameter('due_date', 0) as string;
      const amount = this.getNodeParameter('amount', 0) as number;

      const body: IDataObject = {
        sale_order_id: saleOrderId,
        due_date: dueDate.split('T')[0],
        amount,
      };

      const response = await this.helpers.httpRequest({
        method: 'POST',
        url: `${accountingBaseUrl}/sale-down-payment`,
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
        url: `${accountingBaseUrl}/sale-down-payment/${id}`,
        json: true,
      });
      responseData = response.data || response;
      break;
    }

    case operations.update.value: {
      const id = this.getNodeParameter('id', 0) as string;
      const dueDate = this.getNodeParameter('due_date', 0) as string;
      const amount = this.getNodeParameter('amount', 0) as number;

      const body: IDataObject = {
        due_date: dueDate.split('T')[0],
        amount,
      };

      const response = await this.helpers.httpRequest({
        method: 'PUT',
        url: `${accountingBaseUrl}/sale-down-payment/${id}`,
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
        url: `${accountingBaseUrl}/sale-down-payment/${id}`,
        json: true,
      });
      responseData = response.data || response;
      break;
    }

    case operations.record.value: {
      const id = this.getNodeParameter('id', 0) as string;
      const depositTo = this.getNodeParameter('deposit_to', 0) as string;
      const transactionDate = this.getNodeParameter('transaction_date', 0) as string;
      const paymentMethod = this.getNodeParameter('payment_method', 0) as string;
      const paymentProof = this.getNodeParameter('payment_proof', 0) as string;

      const body: IDataObject = {
        deposit_to: depositTo,
        transaction_date: transactionDate.split('T')[0],
        payment_method: paymentMethod,
        payment_proof: paymentProof,
      };

      const response = await this.helpers.httpRequest({
        method: 'POST',
        url: `${accountingBaseUrl}/sale-down-payment/record/${id}`,
        body,
        json: true,
      });
      responseData = response.data || response;
      break;
    }

    case operations.send.value: {
      const id = this.getNodeParameter('id', 0) as string;
      const to = this.getNodeParameter('to', 0) as string;
      const template = this.getNodeParameter('template', 0) as string;
      const additionalFields = this.getNodeParameter('additionalFields', 0) as IDataObject;

      const body: IDataObject = {
        to: to.split(',').map((email) => email.trim()),
        template,
        ...additionalFields,
      };

      if (body.cc) {
        body.cc = (body.cc as string).split(',').map((email) => email.trim());
      }

      const response = await this.helpers.httpRequest({
        method: 'POST',
        url: `${accountingBaseUrl}/sale-down-payment/send/${id}`,
        body,
        json: true,
      });
      responseData = response.data || response;
      break;
    }

    case operations.print.value: {
      const id = this.getNodeParameter('id', 0) as string;
      const template = this.getNodeParameter('template_print', 0) as string;
      const previewType = this.getNodeParameter('preview_type', 0) as string;

      const body: IDataObject = {
        template,
        preview_type: previewType,
      };

      const response = await this.helpers.httpRequest({
        method: 'POST',
        url: `${accountingBaseUrl}/sale-down-payment/print/${id}`,
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
