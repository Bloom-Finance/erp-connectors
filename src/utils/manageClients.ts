import { Client, Invoice, erpCredentials } from '../types';
import { getInvoices } from './erpsActions';
/**
 * It takes in a set of credentials and returns a client object that can be used to make requests to
 * the Quickbooks API
 * @param credentials - erpCredentials<'quickbooks'>
 * @returns A function that returns a client object
 */
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
/**
 * It returns a client object that has a getInvoices method that returns a promise of an array of
 * invoices, a getInvoice method that returns a promise of an invoice, and a erpType property that is a
 * string literal of 'salesforce' and an erpCredentials property that is the credentials object passed
 * in
 * @param credentials - erpCredentials<'salesforce'>
 * @returns A function that returns a Client object.
 */
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
