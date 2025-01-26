const { generateJwtAndSendRequest } = require("./_lib");
const { apiClientId, secret } = require("./_key");

const GRAPHQL_QUERY = `
query {
    projects {
        id
    }
}
`;

(async () => {
  const response = await generateJwtAndSendRequest(
    apiClientId,
    secret,
    GRAPHQL_QUERY
  );
  console.log(JSON.stringify(response));
})();
