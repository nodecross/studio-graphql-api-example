const { generateJwtAndSendRequest } = require("../lib");
const { apiClientId, secret } = require("../key");

const GRAPHQL_QUERY = `
query {
    projects {
        id
    }
}
`;

generateJwtAndSendRequest(apiClientId, secret, GRAPHQL_QUERY);
