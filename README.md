## ERP connector

An internal library aimed to workalong bloom merchant and feed its interface.

## Get Started

    npm install @bloom/connector

```javascript
import { Connector } from '@bloom/connector';

const credentials = process.env.MY_CREDENTIALS;
const connector = new Connector();
const client = connector.getClient(credentials, '"quickbooks');
```

### Supported ERPS ⚙️

- [Quickbooks](https://developer.intuit.com/app/developer/qbo/docs/get-started) 📚
