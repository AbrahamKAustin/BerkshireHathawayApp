import logging
import azure.functions as func
from Shared import db, Leaderboard, leaderboards_schema
from Shared.config import app
from Shared.helper import validate_jwt_token
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request for leaderboard.')

    try:
        token_header = req.headers.get('Authorization')
        is_valid, _ = validate_jwt_token(token_header)

        if not is_valid:
            return func.HttpResponse("Unauthorized", status_code=401)

        with app.app_context():
            user_leaderboard_entries = Leaderboard.query.all()
            serialized_data = leaderboards_schema.dump(user_leaderboard_entries)

            return func.HttpResponse(json.dumps(serialized_data), status_code=200, mimetype="application/json")

    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        return func.HttpResponse("Internal server error. Check logs for details.", status_code=500)
