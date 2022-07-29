import { Contabilium, IConnector } from '../@types';
import {
  Client,
  ERPs,
  erpCredentials,
  Quickbooks,
  SalesForce,
} from '../@types';
import {
  getContabiliumClient,
  getQuickbooksClient,
  getSalesForceClient,
} from '../services/clients.service';
class Connector implements IConnector {
  constructor() {
    //staff
  }
  /**
   * It returns a client object based on the ERP type.
   * @param credentials - erpCredentials<T>
   * @param {T} erp - T - this is the type of ERP you want to connect to.
   * @returns A client object
   */
  getClient<T extends ERPs>(
    credentials: erpCredentials<T>,
    erp: T
  ): Client<
    T extends 'quickbooks'
      ? 'quickbooks'
      : T extends 'salesforce'
      ? 'salesforce'
      : 'contabilium'
  > {
    switch (erp) {
      case 'quickbooks':
        return getQuickbooksClient(credentials as Quickbooks.client) as any;
      case 'salesforce':
        return getSalesForceClient(credentials as SalesForce.client) as any;
      case 'contabilium':
        return getContabiliumClient(credentials as Contabilium.client) as any;
      default:
        throw new Error(`${erp} is not a valid ERP type`);
    }
  }
}

export default Connector;
