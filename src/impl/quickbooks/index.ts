/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Customer,
  Filters,
  Invoice,
  Pagination,
  Sort,
  IERPConnector,
  Quickbooks,
} from '../../types';
import { ERPConnector } from '../credentials';
import { erpCredentials, Products } from '../../types';
import axios from 'axios';
export class ERPConnectorImpl extends ERPConnector implements IERPConnector {
  private quickbooksCreds = this._credentials as erpCredentials<'quickbooks'>;
  private _url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${this.quickbooksCreds.realmId}`;
  async getCustomer(id: string): Promise<Customer> {
    try {
      const { data } = (await axios.get(
        `${this._url}/customer/${id}?minorversion=40`,
        {
          headers: {
            Authorization: `Bearer ${this.quickbooksCreds.access_token}`,
          },
        }
      )) as {
        data: { Customer: Quickbooks.customer };
      };
      const myCustomer: Customer = {
        id,
        email: data.Customer.PrimaryEmailAddr
          ? data.Customer.PrimaryEmailAddr.Address
          : undefined,
        name: data.Customer.DisplayName,
        phone: data.Customer.PrimaryPhone
          ? data.Customer.PrimaryPhone.FreeFormNumber
          : undefined,
        billAddress: data.Customer.BillAddr
          ? data.Customer.BillAddr.Line1
          : null,
      };
      return myCustomer;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getInvoices(
    filters?: Filters | undefined,
    pagination?: Pagination | undefined,
    sort?: Sort | undefined
  ): Promise<Invoice[]> {
    try {
      const { data } = (await axios.get(
        `${this._url}/query?query=SELECT%20*FROM%20Invoice`,
        {
          headers: {
            Authorization: `Bearer ${this.quickbooksCreds.access_token}`,
          },
        }
      )) as {
        data: { QueryResponse: { Invoice: Quickbooks.Invoice[] } };
      };
      const myInvoices: Invoice[] = [];
      data.QueryResponse.Invoice.forEach((v) => {
        const myProducts: Products[] = [];
        v.Line.forEach((line) => {
          myProducts.push({
            id: line.Id,
            description: line.Description,
            amount: line.Amount,
          });
        });
        myInvoices.push({
          id: v.Id,
          products: myProducts,
          email: v.BillEmail ? v.BillEmail.address : undefined,
          customer: {
            id: v.CustomerRef.value,
          },
          status: 'paid',
          createdAt: 0,
          dueDate: 0,
        });
      });
      return myInvoices as Invoice[];
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getInvoice(id: string): Promise<Invoice> {
    try {
      const { data } = (await axios.get(`${this._url}/invoice/${id}`, {
        headers: {
          Authorization: `Bearer ${this.quickbooksCreds.access_token}`,
        },
      })) as {
        data: { Invoice: Quickbooks.Invoice };
      };
      const myProducts: Products[] = [];
      data.Invoice.Line.forEach((line) => {
        myProducts.push({
          id: line.Id,
          description: line.Description,
          amount: line.Amount,
        });
      });
      const myInvoice: Invoice = {
        id,
        products: myProducts,
        email: data.Invoice.BillEmail.address,
        customer: {
          id: data.Invoice.CustomerRef.value,
        },
        status: 'paid',
        createdAt: 0,
        dueDate: 0,
      };
      return myInvoice;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getCustomers(
    filters?: Filters | undefined,
    pagination?: Pagination | undefined,
    sort?: Sort | undefined
  ): Promise<Customer[]> {
    const { data } = (await axios.get(
      `${this._url}/query?query=SELECT%20*FROM%20Customer`,
      {
        headers: {
          Authorization: `Bearer ${this.quickbooksCreds.access_token}`,
        },
      }
    )) as {
      data: { QueryResponse: { Customer: Quickbooks.customer[] } };
    };
    const myCustomers: Customer[] = [];
    data.QueryResponse.Customer.forEach((v) => {
      console.log(v);
      myCustomers.push({
        id: v.Id,
        email: v.PrimaryEmailAddr ? v.PrimaryEmailAddr.Address : undefined,
        name: v.DisplayName,
        phone: v.PrimaryPhone ? v.PrimaryPhone.FreeFormNumber : undefined,
        billAddress: v.BillAddr ? v.BillAddr.Line1 : null,
      });
    });
    return myCustomers;
  }
}
