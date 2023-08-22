from Shared.config import db
from Shared.models import Realtor_Teams, Team_Task, TaskCompletion
from flask_jwt_extended import decode_token, get_jwt_identity

def validate_jwt_token(token_header):
    if not token_header or not token_header.startswith('Bearer '):
        return (False, "Missing or invalid token")

    token = token_header.split('Bearer ')[1]
    
    try:
        decoded_token = decode_token(token)
        user_identity = get_jwt_identity()
        return (True, user_identity)
    except Exception as e:
        return (False, str(e))
    
def add_task_completions_for_user(user_id):
    realtor_teams = Realtor_Teams.query.filter_by(UserId=user_id).all()

    for realtor_team in realtor_teams:
        team_id = realtor_team.TeamId

        team_tasks = Team_Task.query.filter_by(TeamId=team_id).all()

        for team_task in team_tasks:
            task_completion_entry = TaskCompletion(UserId=user_id, TaskId=team_task.TaskId, CompletionStatus=False)
            db.session.add(task_completion_entry)
    db.session.commit()

