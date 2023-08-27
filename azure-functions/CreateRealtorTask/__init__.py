import logging
import azure.functions as func
from Shared import db, Realtor_Task, TaskCompletion, Tasks, Leaderboard, realtor_task_schema
from Shared.config import app
from Shared.helper import validate_jwt_token
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('create_realtor_task function triggered.')

    user_id = req.route_params.get('userId')
    token_header = req.headers.get('Authorization')

    is_valid, result = validate_jwt_token(token_header)
    if not is_valid:
        return func.HttpResponse(result, status_code=401)

    try:
        with app.app_context():
            req_body = req.get_json()
            realtor_id = user_id
            task_id = req_body['TaskId']
            numeric_answer = req_body['NumericAnswer']
            question_id = req_body.get('QuestionId')

            new_realtor_task = Realtor_Task(realtor_id, task_id, numeric_answer, question_id)
            db.session.add(new_realtor_task)

            task_completion = TaskCompletion.query.filter_by(TaskId=task_id, UserId=user_id).first()
            if task_completion:
                task_completion.CompletionStatus = True
            else:
                return func.HttpResponse(json.dumps({"message": "No matching task_completion record found for the provided TaskId"}), status_code=400, mimetype="application/json")

            task_points = Tasks.query.get(task_id).TaskPoints
            team_id = req_body['TeamId']
            leaderboard_record = Leaderboard.query.filter_by(RealtorId=user_id, TeamId=team_id).first()
            if leaderboard_record:
                leaderboard_record.Points += task_points
            else:
                return func.HttpResponse(json.dumps({"message": "No matching Leaderboard record found for the provided RealtorId and TeamId"}), status_code=400, mimetype="application/json")

            db.session.commit()
            response_body = realtor_task_schema.dump(new_realtor_task)

            return func.HttpResponse(json.dumps(response_body), status_code=200, mimetype="application/json")

    except Exception as e:
        logging.error(f"Error creating realtor task: {str(e)}")
        return func.HttpResponse("Failed to create realtor task. Check logs for details.", status_code=500)
