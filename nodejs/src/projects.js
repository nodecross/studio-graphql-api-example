const { generateJwtAndSendRequest } = require("./_lib");
const { apiClientId, secret } = require("./_key");

const GRAPHQL_QUERY = `
query {
    projects {
        id
    }
}
`;

generateJwtAndSendRequest(apiClientId, secret, GRAPHQL_QUERY);
