const { generateJwtAndSendRequest } = require("./_lib");
const { apiClientId, secret } = require("./_key");

const GRAPHQL_QUERY = `
query {
    metrics(
        deviceId: "PLEASE ENTER YOUR DEVICE ID HERE",
        filter: {
            from: "2024-12-01T00:00:00Z",
            to: "2024-12-02T00:00:00Z"
            metricName: "cpu_usage"
        }
    ) { deviceId, occurredAt, value }
}
`;

generateJwtAndSendRequest(apiClientId, secret, GRAPHQL_QUERY);
