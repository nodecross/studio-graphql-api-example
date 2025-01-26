from _key import API_CLIENT_ID, SECRET
from _lib import generate_jwt_and_send_request

GRAPHQL_QUERY = """
query {
    projects {
        id
    }
}
"""

response = generate_jwt_and_send_request(API_CLIENT_ID, SECRET, GRAPHQL_QUERY)
print(response)
