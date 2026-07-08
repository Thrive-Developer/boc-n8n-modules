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
    case operations.get.value:
      url = `${ENV.ACCOUNTING_BASE_URL}/company-setting/show`;
      method = 'POST';
      break;

    case operations.update.value: {
      url = `${ENV.ACCOUNTING_BASE_URL}/company-setting/update`;
      method = 'PUT';
      const additionalFields = executeFunctions.getNodeParameter(
        'additionalFields',
        0,
      ) as IDataObject;
      body = {
        company_name: executeFunctions.getNodeParameter('company_name', 0) as string,
        company_email: executeFunctions.getNodeParameter('company_email', 0) as string,
        company_city: executeFunctions.getNodeParameter('company_city', 0) as string,
        company_state: executeFunctions.getNodeParameter('company_state', 0) as string,
        company_country: executeFunctions.getNodeParameter('company_country', 0) as string,
        company_zipcode: executeFunctions.getNodeParameter('company_zipcode', 0) as string,
        ...additionalFields,
      };
      break;
    }

    case operations.updateBank.value: {
      url = `${ENV.ACCOUNTING_BASE_URL}/company-setting/bank/update`;
      method = 'PUT';
      const additionalFields = executeFunctions.getNodeParameter(
        'additionalFieldsBank',
        0,
      ) as IDataObject;
      body = {
        company_id: executeFunctions.getNodeParameter('company_id', 0) as number,
        bank_name: executeFunctions.getNodeParameter('bank_name', 0) as string,
        account_number: executeFunctions.getNodeParameter('account_number', 0) as number,
        account_holder: executeFunctions.getNodeParameter('account_holder', 0) as string,
        swift_code: executeFunctions.getNodeParameter('swift_code', 0) as string,
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
