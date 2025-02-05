from _key import API_CLIENT_ID, SECRET
from _lib import generate_jwt_and_send_request

GRAPHQL_QUERY = """
query ($after: String) {
    devices(
        projectIds: [ "PLEASE ENTER YOUR PROJECT IDS HERE" ],
        after: $after
    )  {
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
"""


def fetch_all_devices(api_client_id, secret):
    after = None
    all_devices = []

    while True:
        variables = {"after": after}

        response = generate_jwt_and_send_request(
            api_client_id, secret, GRAPHQL_QUERY, variables
        )

        devices_data = response.get("data", {}).get("devices", {})
        edges = devices_data.get("edges", [])
        page_info = devices_data.get("pageInfo", {})

        for edge in edges:
            all_devices.append(edge["node"])

        if not page_info.get("hasNextPage"):
            break

        after = page_info.get("endCursor")

    return all_devices


devices = fetch_all_devices(API_CLIENT_ID, SECRET)

print(devices)
