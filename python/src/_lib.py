import jwt
import requests
from datetime import datetime, timedelta, timezone


def generate_jwt(api_client_id, secret_key, payload=None):
    headers = {"alg": "HS256", "typ": "JWT"}

    payload = payload or {}
    payload["exp"] = datetime.now(timezone.utc) + timedelta(hours=1)
    payload["api_client_id"] = api_client_id

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


def generate_jwt_and_send_request(
    api_client_id, secret, graphql_query, variables=None
):
    graphql_endpoint = "https://api.nodecross.app/v1/public/graphql"

    try:
        jwt_token = generate_jwt(api_client_id, secret)

        response = send_graphql_request(
            graphql_endpoint,
            jwt_token,
            graphql_query,
            variables,
        )

        return response

    except Exception as e:
        print("Error:", e)
