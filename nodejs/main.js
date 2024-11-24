const jwt = require("jsonwebtoken");

const API_CLIENT_ID = "<PASTE API CLIENT ID>";
const SECRET = "<PASTE SECRET KEY>";
const GRAPHQL_QUERY = `
query {
    projects {
        id
    }
}
`;

function generateJwt(secretKey, payload = {}) {
  const now = Math.floor(Date.now() / 1000);
  payload.exp = now + 60 * 60;
  payload.api_client_id = API_CLIENT_ID;

  return jwt.sign(payload, secretKey, { algorithm: "HS256" });
}

async function sendGraphqlRequest(endpoint, token, query, variables = {}) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `GraphQL request failed with status ${response.status}: ${errorText}`
    );
  }

  return response.json();
}

(async () => {
  const secretKey = SECRET;
  const graphqlEndpoint = "https://http.hub.nodecross.io/api/graphql";
  const graphqlQuery = GRAPHQL_QUERY;

  try {
    const jwtToken = generateJwt(secretKey);
    const response = await sendGraphqlRequest(
      graphqlEndpoint,
      jwtToken,
      graphqlQuery
    );

    console.log("Response:");
    console.dir(response, { depth: null });
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
