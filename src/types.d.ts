/**Connector and client interface**/
export interface IConnector {
  getClient<T extends ERPs>(
    credentials: erpCredentials<T>,
    erp: T
  ): Client<T extends 'quickbooks' ? 'quickbooks' : 'salesforce'> | undefined;
}
export interface IClient {
  getInvoices<T extends ERPs>(
    credentials: erpCredentials<T>,
    filters?: InvoiceFilters
  ): Promise<Invoice[]>;
  getInvoice(): Promise<Invoice>;
}
export interface Client<A extends ERPs> {
  erpType: A;
  erpCredentials: erpCredentials<A>;
  getInvoices(filters?: InvoiceFilters): Promise<Invoice[]>;
  getInvoice(): Promise<Invoice>;
}
export type erpCredentials<T extends ERPs> = T extends 'quickbooks'
  ? Quickbooks.client
  : T extends 'salesforce'
  ? SalesForce.client
  : T;
/**ERPs  related objects**/
export interface Invoice {
  id: string;
  products: Products;
  customer: Customer;
  currency: Currencies;
  email: string;
}
export type ERPs = 'salesforce' | 'quickbooks';
export type Currencies = 'ARS' | 'USD' | 'EUR' | 'ars' | 'usd' | 'eur';
export interface InvoiceFilters {
  status: string;
  from: number;
  to: number;
}
export interface Products extends Quickbooks.products, SalesForce.products {
  id: string;
}
export interface Customer extends Quickbooks.customer, SalesForce.customer {
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
    txDate: string;
  }
  export interface customer {
    email: string;
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
