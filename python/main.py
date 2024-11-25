import jwt
import requests
from datetime import datetime, timedelta, timezone

API_CLIENT_ID = "<PASTE API CLIENT ID>"
SECRET = "<PASTE SECRET KEY>"
GRAPHQL_QUERY = """
query {
    projects {
        id
    }
}
"""


def generate_jwt(secret_key, payload=None):
    headers = {"alg": "HS256", "typ": "JWT"}

    payload = payload or {}
    payload["exp"] = datetime.now(timezone.utc) + timedelta(hours=1)
    payload["api_client_id"] = API_CLIENT_ID

    token = jwt.encode(payload, secret_key, algorithm="HS256", headers=headers)
    return token


def send_graphql_request(endpoint, token, query, variables=None):
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

    payload = {"query": query, "variables": variables or {}}

    response = requests.post(endpoint, json=payload, headers=headers)

    if response.status_code != 200:
        raise requests.exceptions.HTTPError(
            f"GraphQL request failed with status {response.status_code}: "
            f"{response.text}"
        )

    return response.json()


if __name__ == "__main__":
    secret_key = SECRET
    graphql_endpoint = "https://http.hub.nodecross.io/v1/api/graphql"
    graphql_query = GRAPHQL_QUERY

    try:
        jwt_token = generate_jwt(secret_key)

        response = send_graphql_request(
            graphql_endpoint,
            jwt_token,
            graphql_query,
        )

        print("Response:", response)

    except Exception as e:
        print("Error:", e)
