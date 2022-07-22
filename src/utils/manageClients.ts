const decodeCredentials = (credentials: string) => {
  //TODO: manage correctly credentials
  return credentials;
};
const getQuickbooksClient = (merchant_id: string): Client<'quickbooks'> => {
  //staff
  return {
    erpType: 'quickbooks',
    erpCredentials: {
      credentials: {
        client_id: '',
        client_secret: '',
      },
      realmId: '',
      refresh_token: '',
    },
  };
};
const getSalesForceClient = (merchant_id: string): Client<'salesforce'> => {
  return {
    erpType: 'salesforce',
    erpCredentials: {
      credentials: {
        test: '',
      },
    },
  };
};
export { getQuickbooksClient, decodeCredentials, getSalesForceClient };
