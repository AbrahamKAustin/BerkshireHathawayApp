import logging
from datetime import datetime
from sqlalchemy import func as sqlalchemy_func, and_
from Shared.config import app, db
import azure.functions as azure_func
from Shared import Analytics

def main(req: azure_func.HttpRequest) -> azure_func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        with app.app_context():
            calculate_monthly_average_for_all_users() 
            return azure_func.HttpResponse(str({"message": "Monthly average updated successfully for all users!"}), status_code=200)
    except Exception as e:
        logging.error(f"Error calculating monthly average: {str(e)}")
        return azure_func.HttpResponse(str({"error": str(e)}), status_code=500)

def calculate_monthly_average_for_all_users():
    today = datetime.today()
    first_day_of_month = datetime(today.year, today.month, 1)

    avg_results = (db.session.query(Analytics.RealtorId, Analytics.TaskId,
                                    sqlalchemy_func.avg(Analytics.WeeklyTotal).label("MonthlyAvg"))
                   .filter(Analytics.WeekStartDate.between(first_day_of_month, today))
                   .group_by(Analytics.RealtorId, Analytics.TaskId)
                   .all())

    for avg_result in avg_results:
        realtor_id = avg_result[0]
        task_id = avg_result[1]
        monthly_avg = avg_result[2]
        
        existing_record = db.session.query(Analytics).filter(
            and_(Analytics.RealtorId == realtor_id, Analytics.TaskId == task_id, 
                 Analytics.MonthStartDate == first_day_of_month)
        ).first()

        if existing_record:
            existing_record.MonthlyAverage = monthly_avg
        else:
            new_entry = Analytics(RealtorId=realtor_id, TaskId=task_id,
                                  MonthStartDate=first_day_of_month, MonthlyAverage=monthly_avg)
            db.session.add(new_entry)

    db.session.commit()
