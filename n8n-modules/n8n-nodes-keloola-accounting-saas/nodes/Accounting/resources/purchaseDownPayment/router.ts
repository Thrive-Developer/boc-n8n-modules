import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { operations } from './index';

export async function router(this: IExecuteFunctions): Promise<IDataObject[]> {
  const operation = this.getNodeParameter('operation', 0) as string;
  let responseData: IDataObject[] = [];
  const accountingBaseUrl =
    this.getNode().parameters.accountingBaseUrl || '={{$parameter["requestDefaults"]["baseURL"]}}';

  switch (operation) {
    case operations.create.value: {
      const companyId = this.getNodeParameter('company_id', 0) as number;
      const purchaseOrderId = this.getNodeParameter('purchase_order_id', 0) as string;
      const paidFromAccount = this.getNodeParameter('paid_from_account', 0) as string;
      const transactionDate = this.getNodeParameter('transaction_date', 0) as string;
      const amount = this.getNodeParameter('amount', 0) as number;
      const paymentMethod = this.getNodeParameter('payment_method', 0) as string;
      const paymentProof = this.getNodeParameter('payment_proof', 0) as string;

      const body: IDataObject = {
        company_id: companyId,
        purchase_order_id: purchaseOrderId,
        paid_from_account: paidFromAccount,
        transaction_date: transactionDate.split('T')[0],
        amount,
        payment_method: paymentMethod,
        payment_proof: paymentProof,
      };

      const response = await this.helpers.httpRequest({
        method: 'POST',
        url: `${accountingBaseUrl}/purchase-down-payment`,
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
        url: `${accountingBaseUrl}/purchase-down-payment/${id}`,
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
        url: `${accountingBaseUrl}/purchase-down-payment/send/${id}`,
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
        url: `${accountingBaseUrl}/purchase-down-payment/print/${id}`,
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
