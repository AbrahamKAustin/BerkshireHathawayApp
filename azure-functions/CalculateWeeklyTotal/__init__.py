import logging
from datetime import datetime, timedelta
from sqlalchemy import func as sqlalchemy_func, extract
from Shared.config import app, db
import azure.functions as azure_func
from Shared import Realtor_Task, Analytics

def main(req: azure_func.HttpRequest) -> azure_func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        with app.app_context():
            today = datetime.today()
            start_of_week = today - timedelta(days=today.weekday())
            results = (db.session.query(Realtor_Task.RealtorId, Realtor_Task.TaskId, 
                                        sqlalchemy_func.sum(Realtor_Task.NumericAnswer).label("WeeklyTotal"))
                       .filter(extract('week', Realtor_Task.DatePublished) == extract('week', today))
                       .group_by(Realtor_Task.RealtorId, Realtor_Task.TaskId)
                       .all())
            for row in results:
                analytics_entry = Analytics(RealtorId=row.RealtorId, TaskId=row.TaskId,
                                           WeekStartDate=start_of_week, WeeklyTotal=row.WeeklyTotal)
                db.session.add(analytics_entry)
            db.session.commit()
            return azure_func.HttpResponse(str({"message": "Weekly total updated successfully!"}), status_code=200)

    except Exception as e:
        logging.error(f"Error calculating weekly total: {str(e)}")
        return azure_func.HttpResponse(str({"error": str(e)}), status_code=500)

