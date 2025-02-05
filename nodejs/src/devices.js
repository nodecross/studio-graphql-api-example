const { generateJwtAndSendRequest } = require("./_lib");
const { apiClientId, secret } = require("./_key");

const GRAPHQL_QUERY = `
query ($after: String) {
    devices(
        projectIds: [ "PLEASE ENTER YOUR PROJECT IDS HERE" ],
        after: $after
    ) {
        edges {
            node {
                id
                did
                macAddress
                os
                version
                lastSeen
                projectId
                createdAt
                deviceTags {
                    id
                    deviceId
                    deviceTagKey {
                        id
                        name
                    }
                    deviceTagValue
                }
            }
            cursor
        }
        pageInfo {
            hasNextPage
            endCursor
        }
    }
}
`;

async function fetchAllDevices(apiClientId, secret) {
  let after;
  const allDevices = [];

  while (true) {
    const variables = { after };

    const response = await generateJwtAndSendRequest(
      apiClientId,
      secret,
      GRAPHQL_QUERY,
      variables
    );

    const devicesData = response?.data?.devices || {};
    const edges = devicesData.edges || [];
    const pageInfo = devicesData.pageInfo || {};

    for (const edge of edges) {
      allDevices.push(edge.node);
    }

    if (!pageInfo.hasNextPage) {
      break;
    }

    after = pageInfo.endCursor;
  }

  return allDevices;
}

(async () => {
  try {
    const devices = await fetchAllDevices(apiClientId, secret);
    console.log(JSON.stringify(devices));
  } catch (error) {
    console.error("Error fetching devices:", error);
  }
})();
