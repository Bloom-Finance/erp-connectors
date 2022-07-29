import {
  Client,
  Invoice,
  erpCredentials,
  ERPs,
  Pagination,
  Sort,
  Filters,
} from '../@types';
import {
  getCustomer,
  getCustomers,
  getInvoice,
  getInvoices,
} from './erps.service';

/**
 * It takes in an object of credentials and an ERP type, and returns an object with a getInvoices and
 * getInvoice function
 * @param credentials - erpCredentials<T>
 * @param {T} type - ERPs - this is the type of ERP you're connecting to.
 * @returns A function that takes in a type and returns a client
 */
const setClient = <T extends ERPs>(
  credentials: erpCredentials<T>,
  type: T
): Client<T> => {
  const creds: any = {
    erpType: type,
    erpCredentials: {
      ...credentials,
    },
  };
  return {
    getInvoices(filters?: Filters, pagination?: Pagination, sort?: Sort) {
      return getInvoices(creds, filters, pagination, sort);
    },
    getInvoice(id: string) {
      return getInvoice(creds, id);
    },
    getCustomers(pagination: Pagination, sort: Sort) {
      return getCustomers(creds, pagination, sort);
    },
    getCustomer(id: string) {
      return getCustomer(creds, id);
    },
    ...creds,
  };
};

/**
 * It takes in a credentials object and returns a client object
 * @param credentials - erpCredentials<'quickbooks'>
 * @returns A function that takes in a credentials object and returns a client object.
 */
const getQuickbooksClient = (
  credentials: erpCredentials<'quickbooks'>
): Client<'quickbooks'> => {
  return setClient(credentials, 'quickbooks');
};

/**
 * It returns a client object that can be used to make requests to the Salesforce API.
 * @param credentials - erpCredentials<'salesforce'>
 * @returns A function that takes in credentials and returns a client.
 */
const getSalesForceClient = (
  credentials: erpCredentials<'salesforce'>
): Client<'salesforce'> => {
  return setClient(credentials, 'salesforce');
};

/**
 * It takes an object with the credentials of the ERP and returns a client object with the methods to
 * interact with the ERP
 * @param credentials - erpCredentials<'contabilium'>
 * @returns A function that returns a Client object.
 */
const getContabiliumClient = (
  credentials: erpCredentials<'contabilium'>
): Client<'contabilium'> => {
  return setClient(credentials, 'contabilium');
};
export { getQuickbooksClient, getSalesForceClient, getContabiliumClient };
