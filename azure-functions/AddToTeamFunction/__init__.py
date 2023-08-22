import logging
import azure.functions as func
from Shared import db, User, Teams, Realtor_Teams, Leaderboard, Team_Task, TaskCompletion, realtor_teams_schema
import json
from Shared.config import app

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('add to team triggered')

    try:
        with app.app_context():
            req_body = req.get_json()
            UserName = req_body.get('UserName')
            TeamName = req_body.get('TeamName')

            user = User.query.filter_by(Name=UserName).first()
            team = Teams.query.filter_by(TeamName=TeamName).first()

            if user is None or team is None:
                return func.HttpResponse(json.dumps({'error': 'User or team not found'}), mimetype="application/json", status_code=404)

            realtor_team = Realtor_Teams(user.id, team.TeamId)
            db.session.add(realtor_team)

            leaderboard_entry = Leaderboard(user.id, team.TeamId, 0, user.Name)
            db.session.add(leaderboard_entry)

            team_tasks = Team_Task.query.filter_by(TeamId=team.TeamId).all()

            for task in team_tasks:
                task_completion = TaskCompletion(user.id, task.TaskId, False)
                db.session.add(task_completion)

            db.session.commit()

            response_body = realtor_teams_schema.dump(realtor_team)
            return func.HttpResponse(json.dumps(response_body), mimetype="application/json", status_code=200)

    except Exception as e:
        logging.error(f"Error occurred: {e}")
        return func.HttpResponse("Error occurred while processing the request.", status_code=500)
