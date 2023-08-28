import logging
import azure.functions as func
from Shared import db, TaskCompletion
from Shared.config import app

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        with app.app_context():
            tasks = TaskCompletion.query.all()

            for task in tasks:
                task.CompletionStatus = False

            db.session.commit()

        return func.HttpResponse("Task completions reset successfully.", status_code=200)
    except Exception as e:
        logging.error(f"Error resetting task completions: {str(e)}")
        return func.HttpResponse("Failed to reset task completions. Check logs for details.", status_code=500)
