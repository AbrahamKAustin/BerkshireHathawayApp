import logging
import azure.functions as func
from Shared import db, Team_Task, Tasks
from Shared.config import app
from Shared.helper import validate_jwt_token
from datetime import datetime
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('get_team_tasks function triggered.')

    team_id = req.route_params.get('team_id')
    token_header = req.headers.get('Authorization')

    is_valid, result = validate_jwt_token(token_header)

    if not is_valid:
        return func.HttpResponse(result, status_code=401)

    try:
        with app.app_context():
            logging.info(f"Fetching tasks for team_id: {team_id}")
            team_tasks = Team_Task.query.filter_by(TeamId=team_id).all()

            if not team_tasks:
                logging.warning(f"No tasks found for team_id: {team_id}")
                return func.HttpResponse(json.dumps({"message": "No tasks found for this team"}), status_code=404, mimetype="application/json")

            tasks = [Tasks.query.get(task.TaskId) for task in team_tasks]
            logging.info(f"Tasks found for team_id {team_id}: {len(tasks)}")

            tasks_response = []

            for task in tasks:
                task_data = {}
                for column in task.__table__.columns:
                    attr_value = getattr(task, column.name)
                    if isinstance(attr_value, datetime):
                        task_data[column.name] = attr_value.strftime('%Y-%m-%d %H:%M:%S')
                    else:
                        task_data[column.name] = attr_value
                tasks_response.append(task_data)

            return func.HttpResponse(json.dumps(tasks_response), status_code=200, mimetype="application/json")

    except Exception as e:
        logging.error(f"Error fetching team tasks: {str(e)}")
        return func.HttpResponse(f"Failed to fetch team tasks. Error: {str(e)}", status_code=500)
