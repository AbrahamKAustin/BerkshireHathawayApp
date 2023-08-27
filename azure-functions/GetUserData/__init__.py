import logging
import azure.functions as func
from Shared import db, User, user_schema
from Shared.config import app
from Shared.helper import validate_jwt_token
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        with app.app_context():
            user_id = req.route_params.get('user_id')
            token_header = req.headers.get('Authorization')
            is_valid, user_id_from_token_or_error = validate_jwt_token(token_header)

            if not is_valid:
                return func.HttpResponse(user_id_from_token_or_error, status_code=401)

            if user_id_from_token_or_error != user_id:
                return func.HttpResponse(json.dumps({"message": "Unauthorized"}), status_code=401, mimetype="application/json")

            user = User.query.get(user_id)

            if user is None:
                return func.HttpResponse(json.dumps({"message": "User not found"}), status_code=404, mimetype="application/json")

            return func.HttpResponse(json.dumps(user_schema.dump(user)), status_code=200, mimetype="application/json")

    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        return func.HttpResponse("Internal server error. Check logs for details.", status_code=500)
