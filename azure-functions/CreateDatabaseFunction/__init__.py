import logging

import azure.functions as func

from Shared.config import db, app

def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        with app.app_context():
            db.create_all()
        return func.HttpResponse("Database tables initialized successfully!", status_code=200)
    except Exception as e:
        logging.error(f"Error initializing database: {str(e)}")
        return func.HttpResponse("Failed to initialize database. Check logs for details.", status_code=500)
