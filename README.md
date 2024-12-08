# NodeX Studio GraphQL API Example

This Python and Node.js scripts generates a JWT and uses it to make a GraphQL API request.

## Python

### Requirements

- Python 3.7 or higher
- `pyjwt` for generating JWT
- `requests` for sending HTTP requests

### Installation

Install the required packages:

```bash
cd python
pip install -r requirements.txt
```

## Node.js

### Requirements
- Node.js v18 or higher
- `jsonwebtoken` for generating JWT

### Installation

Install the required packages:

```bash
cd node
npm install
```

### Usage
1. Write your API Client ID and Secret in `key.js`.
2. Run the script you need, for example:
```bash
node scripts/projects.js
```

Make sure to include any required IDs in the script before running it.