import logging
import azure.functions as func
from Shared import bcrypt, User, user_schema
from Shared.config import create_access_token, app
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Login function triggered.")
    try:
        with app.app_context():
            logging.info("Entered app context.")
            
            req_body = req.get_json()
            Email = req_body["Email"]
            Password = req_body["Password"]

            user = User.query.filter_by(Email=Email).first()

            if user is None or not bcrypt.check_password_hash(user.Password, Password):
                logging.warning("Invalid email or password.")
                return func.HttpResponse(json.dumps({"msg": "Bad username or password"}), status_code=401, mimetype="application/json")

            access_token = create_access_token(identity=user.id)
            user_data = user_schema.dump(user)
            response_body = {
                "user": user_data,
                "access_token": access_token
            }
            return func.HttpResponse(json.dumps(response_body), status_code=200, mimetype="application/json")

    except Exception as e:
        logging.error(f"Error logging in user: {str(e)}")
        return func.HttpResponse("Failed to login user. Check logs for details.", status_code=500)
