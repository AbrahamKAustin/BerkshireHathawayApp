import logging
import azure.functions as func
from Shared import db, Teams, Realtor_Teams, teams_schema
from Shared.config import app
from Shared.helper import validate_jwt_token
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('get_user_teams function triggered.')

    user_id = req.route_params.get('user_id')
    token_header = req.headers.get('Authorization')
    logging.info(token_header)

    is_valid, result = validate_jwt_token(token_header)

    if not is_valid:
        return func.HttpResponse(result, status_code=401)

    try:
        with app.app_context():
            user_teams = Realtor_Teams.query.filter_by(UserId=user_id).all()
            teams = [Teams.query.get(team.TeamId) for team in user_teams]

            return func.HttpResponse(json.dumps(teams_schema.dump(teams)), status_code=200, mimetype="application/json")

    except Exception as e:
        logging.error(f"Error fetching user teams: {str(e)}")
        return func.HttpResponse("Failed to fetch user teams. Check logs for details.", status_code=500)
