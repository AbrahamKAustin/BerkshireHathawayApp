import logging
import azure.functions as func
from Shared import db, bcrypt, User, Teams, Realtor_Teams, Leaderboard, user_schema
from Shared.config import create_access_token, app
from Shared.helper import add_task_completions_for_user
import json


def main(req: func.HttpRequest) -> func.HttpResponse:
    
    try:
        with app.app_context():
            req_body = req.get_json()
            Name = req_body["Name"]
            Email = req_body["Email"]
            Password = req_body["Password"]

            user_exists = User.query.filter_by(Email=Email).first() is not None
            if user_exists:
                logging.warning(f"User already exists with email: {Email}")
                return func.HttpResponse(json.dumps({"error": "User already exists"}), status_code=409)

            hashed_password = bcrypt.generate_password_hash(Password)
            new_user = User(Name=Name, Email=Email, Password=hashed_password)
            db.session.add(new_user)
            db.session.commit()

            access_token = create_access_token(identity=new_user.id)

            team = Teams.query.filter_by(TeamName="Battle of the Generations").first()
            if team is not None: 
                realtor_team = Realtor_Teams(new_user.id, team.TeamId)
                db.session.add(realtor_team)
                
            add_task_completions_for_user(new_user.id)

            leaderboard_entry = Leaderboard(RealtorId=new_user.id, TeamId=team.TeamId, Points=0)
            db.session.add(leaderboard_entry)
            db.session.commit()

            response_body = {
                "user": user_schema.dump(new_user),
                "access_token": access_token
            }
            return func.HttpResponse(json.dumps(response_body), status_code=200, mimetype="application/json")
    except Exception as e:
        logging.error(f"Error registering user: {str(e)}")
        return func.HttpResponse(f"Failed to register user due to error: {str(e)}", status_code=500)
