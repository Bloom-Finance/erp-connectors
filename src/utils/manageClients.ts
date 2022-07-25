import { Client, Invoice, erpCredentials } from '../types';
import { getInvoices } from './erpsActions';
const getQuickbooksClient = (
  credentials: erpCredentials<'quickbooks'>
): Client<'quickbooks'> => {
  return {
    async getInvoices(filters?) {
      return getInvoices(
        {
          erpType: 'quickbooks',
          erpCredentials: {
            ...credentials,
          },
        },
        filters
      );
    },
    getInvoice() {
      return {} as Promise<Invoice>;
    },
    erpType: 'quickbooks',
    erpCredentials: {
      ...credentials,
    },
  };
};
const getSalesForceClient = (
  credentials: erpCredentials<'salesforce'>
): Client<'salesforce'> => {
  return {
    getInvoices(filters?) {
      return {} as Promise<Invoice[]>;
    },
    getInvoice() {
      return {} as Promise<Invoice>;
    },
    erpType: 'salesforce',
    erpCredentials: {
      ...credentials,
    },
  };
};
export { getQuickbooksClient, getSalesForceClient };
