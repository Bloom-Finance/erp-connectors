class Connector implements IConnector {
  constructor() {
    //staff
  }
  getClient(): Client {
    throw new Error('Method not implemented.');
  }
  getInvoices(filters?: InvoiceFilters | undefined): Promise<Invoice[]> {
    throw new Error('Method not implemented.');
  }
  getInvoice(): Promise<Invoice> {
    throw new Error('Method not implemented.');
  }
}

export default Connector;
