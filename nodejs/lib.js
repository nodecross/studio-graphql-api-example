const jwt = require("jsonwebtoken");

function generateJwt(apiClientId, secretKey, payload = {}) {
  const now = Math.floor(Date.now() / 1000);
  payload.exp = now + 60 * 60;
  payload.api_client_id = apiClientId;

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

async function generateJwtAndSendRequest(apiClientId, secret, graphqlQuery) {
  const graphqlEndpoint = "https://http.hub.nodecross.io/v1/api/graphql";

  try {
    const jwtToken = generateJwt(apiClientId, secret);
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
}

module.exports = {
  generateJwtAndSendRequest,
};
