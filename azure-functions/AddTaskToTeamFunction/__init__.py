import logging
import azure.functions as func
from Shared import db, Teams, Tasks, Team_Task, team_task_schema
from Shared.config import app
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('add task to team triggered')

    try:
        with app.app_context():

            req_body = req.get_json()
            TeamName = req_body.get('TeamName')
            TaskName = req_body.get('TaskName')

            team = Teams.query.filter_by(TeamName=TeamName).first()
            task = Tasks.query.filter_by(TaskName=TaskName).first()

            if team is None or task is None:
                return func.HttpResponse(json.dumps({'error': 'Team or task not found'}), mimetype="application/json", status_code=404)

            team_task = Team_Task(team.TeamId, task.TaskId)
            db.session.add(team_task)
            db.session.commit()

            response_body = team_task_schema.dump(team_task)
            return func.HttpResponse(json.dumps(response_body), mimetype="application/json", status_code=200)

    except Exception as e:
        logging.error(f"Error occurred: {e}")
        return func.HttpResponse("Error occurred while processing the request.", status_code=500)
