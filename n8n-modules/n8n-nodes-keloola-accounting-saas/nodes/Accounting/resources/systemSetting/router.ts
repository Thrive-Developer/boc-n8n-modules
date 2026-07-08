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
      url = `${ENV.ACCOUNTING_BASE_URL}/system-setting/show`;
      method = 'POST';
      break;

    case operations.update.value: {
      url = `${ENV.ACCOUNTING_BASE_URL}/system-setting/update`;
      method = 'PUT';
      const additionalFields = executeFunctions.getNodeParameter(
        'additionalFields',
        0,
      ) as IDataObject;
      body = {
        sys_setting_currency: executeFunctions.getNodeParameter(
          'sys_setting_currency',
          0,
        ) as string,
        sys_setting_currency_symbol_position: executeFunctions.getNodeParameter(
          'sys_setting_currency_symbol_position',
          0,
        ) as string,
        sys_setting_multi_currency: executeFunctions.getNodeParameter(
          'sys_setting_multi_currency',
          0,
        ) as boolean,
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
