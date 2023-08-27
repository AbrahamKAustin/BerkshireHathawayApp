import logging
import azure.functions as func
from Shared import db, Questions, questions_schema
from Shared.config import app
from Shared.helper import validate_jwt_token
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('get_Questions function triggered.')
    
    task_id = req.route_params.get('task_id')
    token_header = req.headers.get('Authorization')

    is_valid, result = validate_jwt_token(token_header)
    if not is_valid:
        return func.HttpResponse(result, status_code=401)

    try:
        with app.app_context():
            questions = Questions.query.filter_by(task_id=task_id).all()

            if not questions:
                return func.HttpResponse(json.dumps([]), status_code=200, mimetype="application/json")

            result = questions_schema.dump(questions)
            return func.HttpResponse(json.dumps(result), status_code=200, mimetype="application/json")

    except Exception as e:
        logging.error(f"Error fetching questions: {str(e)}")
        return func.HttpResponse("Failed to fetch questions. Check logs for details.", status_code=500)
