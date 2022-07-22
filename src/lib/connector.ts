import {
  decodeCredentials,
  getQuickbooksClient,
  getSalesForceClient,
} from '../utils/manageClients';
class Connector implements IConnector {
  constructor() {
    //staff
  }
  /**
   * It returns a client for a given ERP, if the credentials are valid
   * @param {string} credentials - The credentials that you want to use to connect to the ERP.
   * @param {T} erp - The ERP you want to connect to.
   * @returns A client
   */
  getClient<T extends ERPs>(
    credentials: string,
    erp: T
  ): Client<T extends 'quickbooks' ? 'quickbooks' : 'salesforce'> | undefined {
    //for the moment i will supose that credentials are directly the merchant id
    const decodedCredentials = decodeCredentials(credentials);
    switch (erp) {
      case 'quickbooks':
        return getQuickbooksClient(decodedCredentials) as any;
      case 'salesforce':
        getSalesForceClient(decodedCredentials);
      default:
        return undefined;
    }
  }
  getInvoices(filters?: InvoiceFilters | undefined): Promise<Invoice[]> {
    throw new Error('Method not implemented.');
  }
  getInvoice(): Promise<Invoice> {
    throw new Error('Method not implemented.');
  }
}

export default Connector;
