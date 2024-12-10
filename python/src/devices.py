from _key import API_CLIENT_ID, SECRET
from _lib import generate_jwt_and_send_request

GRAPHQL_QUERY = """
query {
    devices(
        projectIds: [ "PLEASE ENTER YOUR PROJECT IDS HERE" ],
        after: {}
    ) { edges { node { id } } }
}
"""

generate_jwt_and_send_request(API_CLIENT_ID, SECRET, GRAPHQL_QUERY)
