# n8n-nodes-keloola-accounting

This is an n8n community node. It lets you integrate [Keloola Accounting](https://keloola.com) services into your n8n workflows.

Keloola Accounting is a comprehensive platform for managing business finances, and this node allows for programmatic access to its features.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Deploy to npmjs

```bash
cd n8n-modules/n8n-nodes-keloola-accounting
npm install
npm run prebuild
npm run lint
npm run build
npm publish --dry-run --access public
npm publish --access public
```

Increase `version` before publishing. This scoped package must stay public on npmjs.

## Operations

**Resource: User**

- **Current User**: Retrieve details of the currently authenticated user.

**Resource: Exchange Currency**

- **Get Many**: Get all available currencies.

**Resource: Journal**

- **Get Many**: Get all journal entries.
- **Get**: Get a journal entry by ID.
- **Create**: Create a new journal entry.
- **Update**: Update a journal entry.
- **Delete**: Delete a journal entry.

**Resource: Organization**

- **Get**: Get the user's organizations.

**Resource: Unit**

- **Get Many**: Get all units.
- **Get**: Get a unit by ID.
- **Create**: Create a new unit.
- **Update**: Update a unit.
- **Delete**: Delete a unit.

**Resource: Category**

- **Get Many**: Get all product categories.
- **Get**: Get a product category by ID.
- **Create**: Create a new product category.
- **Update**: Update a product category.
- **Delete**: Delete a product category.

**Resource: Chart of Account**

- **Get Many**: Get all chart of accounts (paginated).
- **Get Types**: Get all chart of account types.
- **Get**: Get a chart of account by ID.
- **Create**: Create a new chart of account.
- **Update**: Update a chart of account.
- **Delete**: Delete a chart of account.

**Resource: Product**

- **Get Many**: Get all products.
- **Get**: Get a product by ID.
- **Create**: Create a new product.
- **Update**: Update a product.
- **Delete**: Delete a product.

**Resource: Tax**

- **Get Many**: Get all taxes.
- **Get**: Get a tax by ID.
- **Create**: Create a new tax.
- **Update**: Update a tax.
- **Delete**: Delete a tax.

**Resource: Contact**

- **Get Many**: Get all contacts.
- **Get**: Get a contact by ID.
- **Create**: Create a new contact.
- **Update**: Update a contact.
- **Delete**: Delete a contact.

**Resource: Purchase**

- **Purchase Quote**: Get, Get Many, Create, Update, Delete, Send, Print.
- **Purchase Order**: Get, Get Many, Create, Update, Delete, Send, Print.
- **Purchase Delivery**: Get, Get Many, Create, Update, Delete, Send, Print, Confirm.
- **Goods Receive Note**: Get, Get Many, Create, Update, Delete, Send, Print.
- **Purchase Invoice**: Get, Get Many, Create, Update, Delete, Send, Print.
- **Purchase Return**: Get, Get Many, Create, Update, Delete, Send, Print.
- **Purchase Payment**: Get, Get Many, Create, Update, Delete, Print.
- **Purchase Down Payment**: Get, Create, Send, Print.

**Resource: Sales**

- **Sales Quote**: Get, Get Many, Create, Update, Delete, Send, Print.
- **Sales Order**: Get, Get Many, Create, Update, Delete, Send, Print.
- **Sales Delivery**: Get, Get Many, Create, Update, Delete, Send, Print, Deliver, Mark Arrived.
- **Sales Invoice**: Get, Get Many, Create, Update, Delete, Send, Print.
- **Sales Return**: Get, Get Many, Create, Update, Delete, Send, Print.
- **Sales Payment**: Get, Get Many, Create, Update, Delete, Print.
- **Sales Down Payment**: Get, Get Many, Create, Update, Delete, Record Payment, Send, Print.

**Resource: Banking**

- **Bank Account**: Get, Get Many.
- **Bank Income**: Get, Get Many, Create, Update, Delete.
- **Bank Expense**: Get, Get Many, Create, Update, Delete.
- **Bank Transfer**: Get, Get Many, Create, Update, Delete.

**Resource: Settings**

- **Company Setting**: Get, Update, Update Bank Details.
- **System Setting**: Get, Update System Configuration.
- **Sales Setting**: Get, Update Sales Defaults.
- **Purchase Setting**: Get, Update Purchase Defaults.

## Credentials

To use this node, you need to authenticate with the Keloola Authentication API.

1.  Create a **Keloola Authentication API** credential in n8n.
2.  Provide your **Email** and **Password**.
3.  The node will automatically handle the JWT generation and token management.

## Compatibility

- **n8n version**: Tested on n8n v1.0+
- **Node.js**: v18 or higher

## Usage

This node simplifies interactions with the Keloola Accounting API. It handles authentication automatically using the provided credentials.

1.  Add the **Keloola Accounting** node to your workflow.
2.  Select the desired **Resource** (e.g., User).
3.  Select the **Operation** (e.g., Current User).
4.  Execute the node to retrieve data.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Keloola Website](https://keloola.com)
