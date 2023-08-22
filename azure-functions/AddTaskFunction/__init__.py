from Shared import db, Tasks, task_schema, Questions
from Shared.config import app
import json
import azure.functions as func
import logging

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('add task triggered')

    try:
        with app.app_context():
            req_body = req.get_json()
            TaskName = req_body.get('TaskName')
            TaskPoints = req_body.get('TaskPoints')
            TextDescription = req_body.get('TextDescription')
            Publisher = req_body.get('Publisher')
            questions = req_body.get('Questions')

            task = Tasks(TaskName, TaskPoints, TextDescription, Publisher)
            db.session.add(task)
            db.session.commit()

            for question_text in questions:
                question = Questions(question_text, task.TaskId)
                db.session.add(question)
            db.session.commit()

            response_body = task_schema.dump(task)
            return func.HttpResponse(json.dumps(response_body), mimetype="application/json", status_code=200)

    except Exception as e:
        logging.error(f"Error occurred: {e}")
        return func.HttpResponse("Error occurred while processing the request.", status_code=500)
