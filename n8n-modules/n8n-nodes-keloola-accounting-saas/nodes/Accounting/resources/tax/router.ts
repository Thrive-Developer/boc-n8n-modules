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
    case operations.getAll.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/accounting-setup/tax`;
      method = 'GET';
      break;

    case operations.create.value: {
      url = `${ENV.ACCOUNTING_BASE_URL}/accounting-setup/tax`;
      method = 'POST';
      body = {
        name: executeFunctions.getNodeParameter('name', 0) as string,
        rate: executeFunctions.getNodeParameter('rate', 0) as number,
        sale_account: executeFunctions.getNodeParameter('saleAccount', 0) as string,
        purchase_account: executeFunctions.getNodeParameter('purchaseAccount', 0) as string,
        type: executeFunctions.getNodeParameter('type', 0) as string,
        custom_rule: executeFunctions.getNodeParameter('customRule', 0) as boolean,
      };
      const customRule = body.custom_rule as boolean;
      if (customRule) {
        const luxuryGoods = executeFunctions.getNodeParameter('luxuryGoods', 0, '') as string;
        if (luxuryGoods) body.luxury_goods = luxuryGoods;
        const nonLuxuryGoods = executeFunctions.getNodeParameter('nonLuxuryGoods', 0, '') as string;
        if (nonLuxuryGoods) body.non_luxury_goods = nonLuxuryGoods;
      }
      break;
    }

    case operations.get.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/accounting-setup/tax/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'GET';
      break;

    case operations.update.value: {
      url = `${ENV.ACCOUNTING_BASE_URL}/accounting-setup/tax/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'PUT';
      body = {
        name: executeFunctions.getNodeParameter('name', 0) as string,
        rate: executeFunctions.getNodeParameter('rate', 0) as number,
        sale_account: executeFunctions.getNodeParameter('saleAccount', 0) as string,
        purchase_account: executeFunctions.getNodeParameter('purchaseAccount', 0) as string,
        type: executeFunctions.getNodeParameter('type', 0) as string,
        custom_rule: executeFunctions.getNodeParameter('customRule', 0) as boolean,
      };
      const customRuleUpdate = body.custom_rule as boolean;
      if (customRuleUpdate) {
        const luxuryGoods = executeFunctions.getNodeParameter('luxuryGoods', 0, '') as string;
        if (luxuryGoods) body.luxury_goods = luxuryGoods;
        const nonLuxuryGoods = executeFunctions.getNodeParameter('nonLuxuryGoods', 0, '') as string;
        if (nonLuxuryGoods) body.non_luxury_goods = nonLuxuryGoods;
      }
      break;
    }

    case operations.delete.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/accounting-setup/tax/delete/${executeFunctions.getNodeParameter('id', 0)}`;
      method = 'DELETE';
      break;

    default:
      url = '';
      method = 'GET';
      break;
  }

  return { url, method, body };
}
