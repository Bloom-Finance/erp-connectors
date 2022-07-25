import {
  Client,
  ERPs,
  erpCredentials,
  InvoiceFilters,
  Invoice,
  Quickbooks,
  SalesForce,
} from '../types';
import {
  getQuickbooksClient,
  getSalesForceClient,
} from '../utils/manageClients';
class Connector {
  constructor() {
    //staff
  }
  getClient<T extends ERPs>(
    credentials: erpCredentials<T>,
    erp: T
  ): Client<T extends 'quickbooks' ? 'quickbooks' : 'salesforce'> | undefined {
    switch (erp) {
      case 'quickbooks':
        return getQuickbooksClient(credentials as Quickbooks.client) as any;
      case 'salesforce':
        return getSalesForceClient(credentials as SalesForce.client) as any;
      default:
        return undefined;
    }
  }
}

export default Connector;
