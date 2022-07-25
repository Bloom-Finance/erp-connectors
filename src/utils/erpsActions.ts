import axios from 'axios';
import { ERPs, InvoiceFilters, Invoice, erpCredentials } from '../types';
const getInvoices = async <T extends ERPs>(
  credentials: { erpType: T; erpCredentials: erpCredentials<T> },
  filters?: InvoiceFilters
): Promise<Invoice[]> => {
  const { data } = await axios.get(
    `https://afeda8ae-fcb1-4318-b232-bc52ae00ada0.mock.pstmn.io/invoices?status=${filters?.status}&from=${filters?.from}&to=${filters?.to}`
  );
  return data as Invoice[];
};

export { getInvoices };
