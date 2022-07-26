/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import {
  ERPs,
  InvoiceFilters,
  Invoice,
  erpCredentials,
  Customer,
} from '../types';
const getInvoices = async <T extends ERPs>(
  credentials: { erpType: T; erpCredentials: erpCredentials<T> },
  filters?: InvoiceFilters
): Promise<Invoice[]> => {
  const token = ''; //generate token from erp credentials
  //TODO: Handle access token in quickbooks
  const { data } = await axios.get(
    `https://e72c4e4f-991d-4eb8-85ef-a311b4345731.mock.pstmn.io/invoices?status=${filters?.status}&from=${filters?.from}&to=${filters?.to}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data as Invoice[];
};
const getInvoice = async <T extends ERPs>(
  credentials: {
    erpType: T;
    erpCredentials: erpCredentials<T>;
  },
  id: string
): Promise<Invoice> => {
  //staff
  const token = ''; //generate token from erp credentials
  //TODO: Handle access token in quickbooks
  const { data } = await axios.get(
    `https://e72c4e4f-991d-4eb8-85ef-a311b4345731.mock.pstmn.io/invoice/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data as Invoice;
};
const getCustomers = async <T extends ERPs>(credentials: {
  erpType: T;
  erpCredentials: erpCredentials<T>;
}): Promise<Customer[]> => {
  //staff
  const token = ''; //generate token from erp credentials
  //TODO: Handle access token in quickbooks
  const { data } = await axios.get(
    `https://e72c4e4f-991d-4eb8-85ef-a311b4345731.mock.pstmn.io/customers`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data as Customer[];
};

export { getInvoices, getInvoice, getCustomers };
