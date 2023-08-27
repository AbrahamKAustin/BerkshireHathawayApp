import logging
import azure.functions as func
from Shared import db, Analytics, Tasks, analytics_schema
from Shared.config import app
from Shared.helper import validate_jwt_token
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('get_Analytics function triggered.')
    
    user_id = req.route_params.get('user_id')
    token_header = req.headers.get('Authorization')

    is_valid, result = validate_jwt_token(token_header)
    if not is_valid:
        return func.HttpResponse(result, status_code=401)

    try:
        with app.app_context():
            analytics_weekly = db.session.query(Analytics, Tasks.TaskName).join(Tasks, Analytics.TaskId == Tasks.TaskId).filter(
                Analytics.RealtorId == user_id, 
                Analytics.WeeklyTotal.isnot(None)
            ).order_by(Analytics.WeekStartDate.desc()).limit(4).all()

            analytics_monthly = db.session.query(Analytics, Tasks.TaskName).join(Tasks, Analytics.TaskId == Tasks.TaskId).filter(
                Analytics.RealtorId == user_id, 
                Analytics.MonthlyAverage.isnot(None)
            ).order_by(Analytics.MonthStartDate.desc()).limit(4).all()

            if not analytics_weekly and not analytics_monthly:
                return func.HttpResponse(json.dumps({"message": "No analytics found for this user"}), status_code=404, mimetype="application/json")

            result_weekly = [{'analytics': analytics_schema.dump(item[0]), 'TaskName': item[1]} for item in analytics_weekly]
            result_monthly = [{'analytics': analytics_schema.dump(item[0]), 'TaskName': item[1]} for item in analytics_monthly]

            response = {
                "weekly": result_weekly, 
                "monthly": result_monthly
            }
            return func.HttpResponse(json.dumps(response), status_code=200, mimetype="application/json")

    except Exception as e:
        logging.error(f"Error fetching analytics: {str(e)}")
        return func.HttpResponse("Failed to fetch analytics. Check logs for details.", status_code=500)
