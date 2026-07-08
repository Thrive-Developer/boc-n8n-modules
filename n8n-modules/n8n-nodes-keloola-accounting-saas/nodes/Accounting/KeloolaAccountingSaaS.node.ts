import {
  IExecuteFunctions,
  ILoadOptionsFunctions,
  INodePropertyOptions,
  IHttpRequestMethods,
  INodeExecutionData,
  NodeConnectionTypes,
  NodeOperationError,
  type IDataObject,
  type INodeType,
  type INodeTypeDescription,
} from 'n8n-workflow';

import {
  operations as userOperations,
  resources as userResources,
  userNode,
} from './resources/user';
import {
  purchaseQuoteNode,
  resources as purchaseQuoteResources,
  router as purchaseQuoteRouter,
} from './resources/purchaseQuote';
import {
  purchaseOrderNode,
  resources as purchaseOrderResources,
  router as purchaseOrderRouter,
} from './resources/purchaseOrder';
import {
  purchaseDeliveryNode,
  resources as purchaseDeliveryResources,
  router as purchaseDeliveryRouter,
} from './resources/purchaseDelivery';
import {
  purchaseGoodReceiveNoteNode,
  resources as purchaseGoodReceiveNoteResources,
  router as purchaseGoodReceiveNoteRouter,
} from './resources/purchaseGoodReceiveNote';
import {
  purchaseInvoiceNode,
  resources as purchaseInvoiceResources,
  router as purchaseInvoiceRouter,
} from './resources/purchaseInvoice';
import {
  contactNode,
  resources as contactResources,
  router as contactRouter,
} from './resources/contact';
import { resources as unitResources, router as unitRouter, unitNode } from './resources/unit';
import {
  exchangeNode,
  resources as exchangeResources,
  router as exchangeRouter,
} from './resources/exchange';
import {
  categoryNode,
  resources as categoryResources,
  router as categoryRouter,
} from './resources/category';
import {
  chartOfAccountNode,
  resources as chartOfAccountResources,
  router as chartOfAccountRouter,
} from './resources/chartOfAccount';
import { taxNode, resources as taxResources, router as taxRouter } from './resources/tax';
import {
  operations as organizationOperations,
  resources as organizationResources,
  organizationNode,
} from './resources/organization';
import {
  productNode,
  resources as productResources,
  router as productRouter,
} from './resources/product';
import {
  journalNode,
  resources as journalResources,
  router as journalRouter,
} from './resources/journal';
import {
  salesQuoteNode,
  resources as salesQuoteResources,
  router as salesQuoteRouter,
} from './resources/salesQuote';
import {
  salesOrderNode,
  resources as salesOrderResources,
  router as salesOrderRouter,
} from './resources/salesOrder';
import {
  salesDeliveryNode,
  resources as salesDeliveryResources,
  router as salesDeliveryRouter,
} from './resources/salesDelivery';
import {
  salesInvoiceNode,
  resources as salesInvoiceResources,
  router as salesInvoiceRouter,
} from './resources/salesInvoice';
import {
  bankIncomeNode,
  resources as bankIncomeResources,
  router as bankIncomeRouter,
} from './resources/bankIncome';
import {
  bankExpenseNode,
  resources as bankExpenseResources,
  router as bankExpenseRouter,
} from './resources/bankExpense';
import {
  bankTransferNode,
  resources as bankTransferResources,
  router as bankTransferRouter,
} from './resources/bankTransfer';
import {
  bankAccountNode,
  resources as bankAccountResources,
  router as bankAccountRouter,
} from './resources/bankAccount';
import {
  companySettingNode,
  resources as companySettingResources,
  router as companySettingRouter,
} from './resources/companySetting';
import {
  systemSettingNode,
  resources as systemSettingResources,
  router as systemSettingRouter,
} from './resources/systemSetting';
import {
  salesSettingNode,
  resources as salesSettingResources,
  router as salesSettingRouter,
} from './resources/salesSetting';
import {
  purchaseSettingNode,
  resources as purchaseSettingResources,
  router as purchaseSettingRouter,
} from './resources/purchaseSetting';
import {
  salesReturnNode,
  resources as salesReturnResources,
  router as salesReturnRouter,
} from './resources/salesReturn';
import {
  purchaseReturnNode,
  resources as purchaseReturnResources,
  router as purchaseReturnRouter,
} from './resources/purchaseReturn';
import {
  salesPaymentNode,
  resources as salesPaymentResources,
  router as salesPaymentRouter,
} from './resources/salesPayment';
import {
  purchasePaymentNode,
  resources as purchasePaymentResources,
  router as purchasePaymentRouter,
} from './resources/purchasePayment';
import {
  salesDownPaymentNode,
  resources as salesDownPaymentResources,
  router as salesDownPaymentRouter,
} from './resources/salesDownPayment';
import {
  purchaseDownPaymentNode,
  resources as purchaseDownPaymentResources,
  router as purchaseDownPaymentRouter,
} from './resources/purchaseDownPayment';

import { ENV } from '../../env';

export class KeloolaAccountingSaaS implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Keloola Accounting (SaaS)',
    name: 'keloolaAccountingSaaS',
    icon: 'file:../../icons/accounting.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Keloola Accounting API',
    defaults: {
      name: 'Keloola Accounting',
    },
    usableAsTool: true,
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [],
    requestDefaults: {
      baseURL: ENV.ACCOUNTING_BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'en',
      },
    },
    properties: [
      {
        displayName: 'Token',
        name: 'token',
        type: 'string',
        typeOptions: { password: true },
        required: true,
        default: '',
        description: 'Bearer token for authentication',
      },
      // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          ...Object.values(userResources),
          ...Object.values(organizationResources),
          ...Object.values(unitResources),
          ...Object.values(categoryResources),
          ...Object.values(chartOfAccountResources),
          ...Object.values(taxResources),
          ...Object.values(productResources),
          ...Object.values(journalResources),
          ...Object.values(exchangeResources),
          ...Object.values(purchaseQuoteResources),
          ...Object.values(purchaseOrderResources),
          ...Object.values(purchaseDeliveryResources),
          ...Object.values(purchaseGoodReceiveNoteResources),
          ...Object.values(purchaseInvoiceResources),
          ...Object.values(contactResources),
          ...Object.values(salesQuoteResources),
          ...Object.values(salesOrderResources),
          ...Object.values(salesDeliveryResources),
          ...Object.values(salesInvoiceResources),
          ...Object.values(bankIncomeResources),
          ...Object.values(bankExpenseResources),
          ...Object.values(bankTransferResources),
          ...Object.values(bankAccountResources),
          ...Object.values(companySettingResources),
          ...Object.values(systemSettingResources),
          ...Object.values(salesSettingResources),
          ...Object.values(purchaseSettingResources),
          ...Object.values(salesReturnResources),
          ...Object.values(purchaseReturnResources),
          ...Object.values(salesPaymentResources),
          ...Object.values(purchasePaymentResources),
          ...Object.values(salesDownPaymentResources),
          ...Object.values(purchaseDownPaymentResources),
        ],
        default: userResources.user.value,
      },
      ...userNode,
      ...organizationNode,
      ...unitNode,
      ...categoryNode,
      ...chartOfAccountNode,
      ...taxNode,
      ...productNode,
      ...journalNode,
      ...exchangeNode,
      ...purchaseQuoteNode,
      ...purchaseOrderNode,
      ...purchaseDeliveryNode,
      ...purchaseGoodReceiveNoteNode,
      ...purchaseInvoiceNode,
      ...contactNode,
      ...salesQuoteNode,
      ...salesOrderNode,
      ...salesDeliveryNode,
      ...salesInvoiceNode,
      ...bankIncomeNode,
      ...bankExpenseNode,
      ...bankTransferNode,
      ...bankAccountNode,
      ...companySettingNode,
      ...systemSettingNode,
      ...salesSettingNode,
      ...purchaseSettingNode,
      ...salesReturnNode,
      ...purchaseReturnNode,
      ...salesPaymentNode,
      ...purchasePaymentNode,
      ...salesDownPaymentNode,
      ...purchaseDownPaymentNode,
    ],
  };

  methods = {
    loadOptions: {
      async getCurrencies(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
        const token = this.getNodeParameter('token', '') as string;

        const response = await this.helpers.httpRequest({
          method: 'GET',
          url: `${ENV.ACCOUNTING_BASE_URL}/exchange?page=1&search=false&per_page=10`,
          headers: { Authorization: `Bearer ${token}`, 'Accept-Language': 'en' },
          json: true,
        });

        const result = (response.data?.result || response) as IDataObject[];
        if (!Array.isArray(result)) {
          return [];
        }

        return result.map((currency: IDataObject) => ({
          name: `${currency.code} - ${currency.name}`,
          value: currency.uuid as string,
        }));
      },

      async getBankAccounts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
        const token = this.getNodeParameter('token', '') as string;

        const response = await this.helpers.httpRequest({
          method: 'GET',
          url: `${ENV.ACCOUNTING_BASE_URL}/banks?per_page=1000`,
          headers: { Authorization: `Bearer ${token}`, 'Accept-Language': 'en' },
          json: true,
        });

        const result = (response.data?.result || response) as IDataObject[];
        if (!Array.isArray(result)) {
          return [];
        }

        return result.map((account: IDataObject) => ({
          name: `${account.number} - ${account.name}`,
          value: account.uuid as string,
        }));
      },

      async getAccounts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
        const token = this.getNodeParameter('token', '') as string;

        const response = await this.helpers.httpRequest({
          method: 'GET',
          url: `${ENV.ACCOUNTING_BASE_URL}/banks/accounts`,
          headers: { Authorization: `Bearer ${token}`, 'Accept-Language': 'en' },
          json: true,
        });

        const result = (response.data?.result || response) as IDataObject[];
        if (!Array.isArray(result)) {
          return [];
        }

        return result.map((account: IDataObject) => ({
          name: `${account.code} - ${account.name}`,
          value: account.uuid as string,
        }));
      },

      async getContacts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
        const token = this.getNodeParameter('token', '') as string;

        const response = await this.helpers.httpRequest({
          method: 'GET',
          url: `${ENV.ACCOUNTING_BASE_URL}/banks/contacts`,
          headers: { Authorization: `Bearer ${token}`, 'Accept-Language': 'en' },
          json: true,
        });

        const result = (response.data?.result || response) as IDataObject[];
        if (!Array.isArray(result)) {
          return [];
        }

        return result.map((contact: IDataObject) => ({
          name: contact.name as string,
          value: contact.uuid as string,
        }));
      },

      async getTaxes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
        const token = this.getNodeParameter('token', '') as string;

        const response = await this.helpers.httpRequest({
          method: 'GET',
          url: `${ENV.ACCOUNTING_BASE_URL}/banks/taxes`,
          headers: { Authorization: `Bearer ${token}`, 'Accept-Language': 'en' },
          json: true,
        });

        const result = (response.data?.result || response) as IDataObject[];
        if (!Array.isArray(result)) {
          return [];
        }

        return result.map((tax: IDataObject) => ({
          name: tax.name as string,
          value: tax.uuid as string,
        }));
      },
    },
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    const token = this.getNodeParameter('token', 0) as string;

    let url = '';
    let method: IHttpRequestMethods = 'GET';
    let body: IDataObject = {};

    if (resource === userResources.user.value) {
      switch (operation) {
        case userOperations.currentUser.value:
          url = `${ENV.AUTH_BASE_URL}/user`;
          method = 'GET';
          break;

        default:
          url = '';
          method = 'GET';
          break;
      }
    }

    if (resource === organizationResources.organization.value) {
      switch (operation) {
        case organizationOperations.get.value:
          url = `${ENV.ACCOUNTING_BASE_URL}/users/permission`;
          method = 'POST';
          break;

        default:
          url = '';
          method = 'GET';
          break;
      }
    }

    if (resource === unitResources.unit.value) {
      const routing = await unitRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === categoryResources.category.value) {
      const routing = await categoryRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === chartOfAccountResources.chartOfAccount.value) {
      const routing = await chartOfAccountRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === taxResources.tax.value) {
      const routing = await taxRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === productResources.product.value) {
      const routing = await productRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === journalResources.journal.value) {
      const routing = await journalRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === exchangeResources.exchange.value) {
      const routing = await exchangeRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === purchaseQuoteResources.purchaseQuote.value) {
      const routing = await purchaseQuoteRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === purchaseOrderResources.purchaseOrder.value) {
      const routing = await purchaseOrderRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === purchaseDeliveryResources.purchaseDelivery.value) {
      const routing = await purchaseDeliveryRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === purchaseGoodReceiveNoteResources.purchaseGoodReceiveNote.value) {
      const routing = await purchaseGoodReceiveNoteRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === purchaseInvoiceResources.purchaseInvoice.value) {
      const routing = await purchaseInvoiceRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === contactResources.contact.value) {
      const routing = await contactRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === salesQuoteResources.salesQuote.value) {
      const routing = await salesQuoteRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === salesOrderResources.salesOrder.value) {
      const routing = await salesOrderRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === salesDeliveryResources.salesDelivery.value) {
      const routing = await salesDeliveryRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === salesInvoiceResources.salesInvoice.value) {
      const routing = await salesInvoiceRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === bankIncomeResources.bankIncome.value) {
      const routing = await bankIncomeRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === bankExpenseResources.bankExpense.value) {
      const routing = await bankExpenseRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === bankTransferResources.bankTransfer.value) {
      const routing = await bankTransferRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === bankAccountResources.bankAccount.value) {
      const routing = await bankAccountRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === companySettingResources.companySetting.value) {
      const routing = await companySettingRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === systemSettingResources.systemSetting.value) {
      const routing = await systemSettingRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === salesSettingResources.salesSetting.value) {
      const routing = await salesSettingRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === purchaseSettingResources.purchaseSetting.value) {
      const routing = await purchaseSettingRouter(this, operation);
      url = routing.url;
      method = routing.method;
      body = routing.body;
    }

    if (resource === salesReturnResources.salesReturn.value) {
      const responseData = await salesReturnRouter.call(this);
      return [this.helpers.returnJsonArray(responseData)];
    }

    if (resource === purchaseReturnResources.purchaseReturn.value) {
      const responseData = await purchaseReturnRouter.call(this);
      return [this.helpers.returnJsonArray(responseData)];
    }

    if (resource === salesPaymentResources.salesPayment.value) {
      const responseData = await salesPaymentRouter.call(this);
      return [this.helpers.returnJsonArray(responseData)];
    }

    if (resource === purchasePaymentResources.purchasePayment.value) {
      const responseData = await purchasePaymentRouter.call(this);
      return [this.helpers.returnJsonArray(responseData)];
    }

    if (resource === salesDownPaymentResources.salesDownPayment.value) {
      const responseData = await salesDownPaymentRouter.call(this);
      return [this.helpers.returnJsonArray(responseData)];
    }

    if (resource === purchaseDownPaymentResources.purchaseDownPayment.value) {
      const responseData = await purchaseDownPaymentRouter.call(this);
      return [this.helpers.returnJsonArray(responseData)];
    }

    if (url === '') {
      throw new NodeOperationError(this.getNode(), `No operation found for ${resource}`);
    }

    try {
      const response = await this.helpers.httpRequest({
        method,
        url,
        body,
        headers: { Authorization: `Bearer ${token}`, 'Accept-Language': 'en' },
      });

      return [this.helpers.returnJsonArray(response)];
    } catch (error) {
      if (error.response) {
        throw new NodeOperationError(
          this.getNode(),
          `${JSON.stringify(error.response.data || error.message)}`,
          {
            description: `Status: ${error.response.status}\nURL: ${url}\nMethod: ${method}\nBody: ${JSON.stringify(body, null, 2)}`,
          },
        );
      }
      if (this.continueOnFail()) {
        return [
          this.helpers.returnJsonArray({
            error: error instanceof Error ? error.message : String(error),
          }),
        ];
      }

      throw new NodeOperationError(
        this.getNode(),
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
