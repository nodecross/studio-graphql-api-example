from key import API_CLIENT_ID, SECRET
from lib import generate_jwt_and_send_request

GRAPHQL_QUERY = """
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
"""

generate_jwt_and_send_request(API_CLIENT_ID, SECRET, GRAPHQL_QUERY)
