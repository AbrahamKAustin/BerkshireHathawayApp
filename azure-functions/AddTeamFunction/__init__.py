import logging
import azure.functions as func
from Shared import db, Teams, team_schema
from Shared.config import app
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        with app.app_context():
            req_body = req.get_json()
            TeamName = req_body.get('TeamName')
            Publisher = req_body.get('Publisher')

            team = Teams(TeamName, Publisher)
            db.session.add(team)
            db.session.commit()

            response_body = team_schema.dump(team)
            return func.HttpResponse(json.dumps(response_body), mimetype="application/json", status_code=200)

    except Exception as e:
        logging.error(f"Error occurred: {e}")
        return func.HttpResponse("Error occurred while processing the request.", status_code=500)
