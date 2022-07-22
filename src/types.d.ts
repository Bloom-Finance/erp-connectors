/**Connector and client interface**/
interface IConnector {
  getClient<T extends ERPs>(
    credentials: string,
    erp: T
  ): Client<T extends 'quickbooks' ? 'quickbooks' : 'salesforce'> | undefined;
  getInvoices(filters?: InvoiceFilters): Promise<Array<Invoice>>;
  getInvoice(): Promise<Invoice>;
}
interface Client<A extends ERPs> {
  erpType: A;
  erpCredentials: erpCredentials<A>;
}
type erpCredentials<T extends ERPs> = T extends 'quickbooks'
  ? Quickbooks.client
  : T extends 'salesforce'
  ? SalesForce.client
  : T;
/**ERPs  related objects**/
interface Invoice {
  id: string;
  products: Products;
  customer: Customer;
  currency: Currencies;
}
type ERPs = 'salesforce' | 'quickbooks';
type Currencies = 'ARS' | 'USD' | 'EUR' | 'ars' | 'usd' | 'eur';
interface InvoiceFilters {
  status: string;
  from: bigint;
  to: bigint;
}
interface Products extends Quickbooks.products, SalesForce.products {
  id: string;
}
interface Customer extends Quickbooks.customer, SalesForce.customer {
  id: string;
}
/**ERPs namespaces**/
declare namespace Quickbooks {
  export interface client {
    credentials: {
      client_id: string;
      client_secret: string;
    };
    realmId: string;
    refresh_token: string;
  }
  export interface products {
    txDate?: string;
  }
  export interface customer {
    email?: string;
  }
}
declare namespace SalesForce {
  export interface client {
    credentials: {
      test: string;
    };
  }
  export interface products {
    billEmail?: string;
  }
  export interface customer {
    phone?: string;
  }
}
