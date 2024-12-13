const { generateJwtAndSendRequest } = require("./_lib");
const { apiClientId, secret } = require("./_key");

const PROJECT_IDS = ["PLEASE ENTER YOUR PROJECT IDS HERE"];

const GRAPHQL_QUERY = `
query {
    devices(
        projectIds: ${JSON.stringify(PROJECT_IDS)},
        after: {}
    ) { edges { node { id } } }
}
`;

generateJwtAndSendRequest(apiClientId, secret, GRAPHQL_QUERY);
