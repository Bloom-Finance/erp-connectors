/**Connector and client interface**/
interface IConnector {
  getClient(): Client;
  getInvoices(filters?: InvoiceFilters): Promise<Array<Invoice>>;
  getInvoice(): Promise<Invoice>;
}
interface Client {
  merchant: string;
}
/**ERPs  related objects**/
interface Invoice {
  id: string;
  products: Products;
  customer: Customer;
  currency: Currencies;
}
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
  export type refreshToken = string;
  export interface products {
    txDate?: string;
  }
  export interface customer {
    email?: string;
  }
}
declare namespace SalesForce {
  export type client = string;
  export interface products {
    billEmail?: string;
  }
  export interface customer {
    phone?: string;
  }
}
