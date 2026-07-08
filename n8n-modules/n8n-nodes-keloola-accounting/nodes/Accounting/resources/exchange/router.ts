import { IExecuteFunctions, IDataObject, IHttpRequestMethods } from 'n8n-workflow';
import { ENV } from '../../../../env';
import { operations } from './index';

export async function router(
  executeFunctions: IExecuteFunctions,
  operation: string,
): Promise<{ url: string; method: IHttpRequestMethods; body: IDataObject }> {
  let url = '';
  let method: IHttpRequestMethods = 'GET';
  const body: IDataObject = {};

  switch (operation) {
    case operations.getAll.value: {
      const page = executeFunctions.getNodeParameter('page', 0, 1) as number;
      const perPage = executeFunctions.getNodeParameter('per_page', 0, 100) as number;
      const additionalFields = executeFunctions.getNodeParameter(
        'additionalFields',
        0,
        {},
      ) as IDataObject;
      const excludeBase = additionalFields.exclude_base as boolean | undefined;

      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('per_page', perPage.toString());

      if (excludeBase !== undefined) {
        queryParams.append('exclude_base', excludeBase.toString());
      }

      url = `${ENV.ACCOUNTING_BASE_URL}/exchange?${queryParams.toString()}`;
      method = 'GET';
      break;
    }

    default:
      url = '';
      method = 'GET';
      break;
  }

  return { url, method, body };
}
