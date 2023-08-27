import logging
import azure.functions as func
from Shared import db, Team_Task, TaskCompletion
from Shared.config import app
from Shared.helper import validate_jwt_token
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('get_task_completion function triggered.')

    user_id = req.route_params.get('user_id')
    team_id = req.route_params.get('team_id')
    token_header = req.headers.get('Authorization')

    is_valid, result = validate_jwt_token(token_header)

    if not is_valid:
        return func.HttpResponse(result, status_code=401)

    try:
        with app.app_context():
            team_tasks = Team_Task.query.filter_by(TeamId=team_id).all()

            task_ids = [task.TaskId for task in team_tasks]

            user_tasks_completion = TaskCompletion.query.filter(TaskCompletion.UserId == user_id, TaskCompletion.TaskId.in_(task_ids)).all()

            if not user_tasks_completion:
                return func.HttpResponse(json.dumps({"message": "No tasks completion entries found for this user"}), status_code=404, mimetype="application/json")

            result = [{'TaskId': task_completion.TaskId, 'UserId': task_completion.UserId, 'CompletionStatus': task_completion.CompletionStatus} for task_completion in user_tasks_completion]

            return func.HttpResponse(json.dumps(result), status_code=200, mimetype="application/json")

    except Exception as e:
        logging.error(f"Error fetching task completion: {str(e)}")
        return func.HttpResponse("Failed to fetch task completion. Check logs for details.", status_code=500)
