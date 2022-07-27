import { description } from '../../merchant/src/_mock/text';
/**Connector and client interface**/
export interface IConnector {
  getClient<T extends ERPs>(
    credentials: erpCredentials<T>,
    erp: T
  ):
    | Client<
        T extends 'quickbooks'
          ? 'quickbooks'
          : T extends 'salesforce'
          ? 'salesforce'
          : 'contabilium'
      >
    | undefined;
}

export interface IERPConnector {
  getInvoices(
    filters?: Filters,
    pagination?: Pagination,
    sort?: Sort
  ): Promise<Invoice[]>;
  getInvoice(id: string): Promise<Invoice>;
  getCustomers(
    filters?: Filters,
    pagination?: Pagination,
    sort?: Sort
  ): Promise<Customer[]>;
  getCustomer(id: string): Promise<Customer>;
}
export interface Client<A extends ERPs> {
  erpType: A;
  erpCredentials: erpCredentials<A>;
  getInvoices(
    filters?: Filters,
    pagination?: Pagination,
    sort?: Sort
  ): Promise<Invoice[]>;
  getInvoice(id: string): Promise<Invoice>;
  getCustomers(
    filters?: Filters,
    pagination?: Pagination,
    sort?: Sort
  ): Promise<Customer[]>;
  getCustomer(id: string): Promise<Customer>;
}

/**ERPs  related objects**/
export type erpCredentials<T extends ERPs> = T extends 'quickbooks'
  ? Quickbooks.client
  : T extends 'salesforce'
  ? SalesForce.client
  : Contabilium.client;
export interface Invoice {
  id: string;
  products: Products[];
  customer: {
    id: string;
  };
  email?: string;
  status: 'paid' | 'unpaid' | 'overdue' | 'draft';
  createdAt: number;
  dueDate: number;
}
export type ERPs = 'salesforce' | 'quickbooks' | 'contabilium';
export type Currencies = 'ARS' | 'USD' | 'EUR' | 'ars' | 'usd' | 'eur';
export interface Filters {
  status: string;
  from: number;
  to: number;
}
export interface Pagination {
  offset: number;
  limit: number;
}
export interface Sort {
  fieldName: string;
  order: 'asc' | 'desc';
}
export interface Products {
  id?: string;
  description?: string;
  amount: number;
}
export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  billAddress: string | null;
}
/**ERPs namespaces**/
declare namespace Quickbooks {
  export interface error {
    response: {
      data: {
        Fault: {
          type: 'ValidationFault' | 'other';
          Error: {
            Message: string;
            Detail: string;
            code: string;
            element: string;
          };
        };
        time: string;
      };
    };
  }
  export interface client {
    credentials: {
      client_id: string;
      client_secret: string;
    };
    realmId: string;
    refresh_token: string;
    access_token: string;
  }
  export interface products {
    Description: string;
    DetailType: string;
    LineNum: number;
    Amount: number;
    Id: string;
    SalesItemLineDetail: {
      TaxCodeRef: {
        value: string;
      };
      Qty: number;
      UnitPrice: number;
      ServiceDate: string;
      ItemRef: {
        name: string;
        value: string;
      };
    };
  }
  export interface Invoice {
    Id: string;
    TxnDate: string;
    domain: string;
    CurrencyRef: {
      name: string;
      value: string;
    };
    ShipDate: string;
    TrackingNum: string;
    ClassRef: {
      name: string;
      value: string;
    };
    PrintStatus: string;
    SalesTermRef: {
      value: string;
    };
    DeliveryInfo: {
      DeliveryType: string;
      DeliveryTime: string;
    };
    TotalAmt: number;
    Line: Quickbooks.products[];
    CustomerRef: {
      value: string;
    };
    BillEmail: {
      address: string;
    };
    EmailStatus: string;
  }
  export interface customer {
    PrimaryEmailAddr: {
      Address: string;
    };
    GivenName: string;
    DisplayName: string;
    CompanyName: string;
    PrimaryPhone: {
      FreeFormNumber: string;
    };
    BillAddr: {
      Line1: string;
    };
    Id: string;
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
declare namespace Contabilium {
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
