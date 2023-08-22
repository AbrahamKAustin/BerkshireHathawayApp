from .config import db, jwt, bcrypt, ma
from .models import User, user_schema, Teams, Realtor_Teams, Leaderboard
from .models import Tasks, task_schema, Questions, team_schema, Team_Task
from .models import TaskCompletion, realtor_teams_schema, team_task_schema, teams_schema
from .models import leaderboards_schema, questions_schema
from .models import Realtor_Task, realtor_task_schema, Analytics, analytics_schema
from .helper import validate_jwt_token, add_task_completions_for_user
