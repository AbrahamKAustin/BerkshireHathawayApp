from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from  flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import datetime
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from uuid import uuid4
import os
from flask import current_app
from sqlalchemy import or_
app = Flask(__name__)



app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:hello@localhost/berkshirehathaway'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('SECRET_KEY', default='\xe61\xc8\xaf\xb8~\xf2\x07\xc4\x05\x02\xc7\xf82\r')
jwt = JWTManager(app)

db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)

def get_uuid():
    return uuid4().hex

class User(db.Model):
    id = db.Column(db.String(32), primary_key = True, unique = True, default= get_uuid)
    Name = db.Column(db.String(50))
    Email = db.Column(db.String(50), unique =True)
    Password = db.Column(db.Text(), nullable = False)
    Role = db.Column(db.Integer, nullable = False, default = 1)

    def __init__(self, Name, Email,  Password):
        self.Name = Name
        self.Email = Email
        self.Password = Password
        

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'Name', 'Email', 'Role')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class Tasks(db.Model):
    TaskId = db.Column(db.Integer, primary_key = True)
    TaskName = db.Column(db.String(50))
    TaskPoints = db.Column(db.Integer)
    TextDescription = db.Column(db.Text())
    DatePublished = db.Column(db.DateTime, default = datetime.datetime.now)
    Publisher = db.Column(db.String(50))
    Questions = db.relationship('Questions', backref='task', lazy=True)

    def __init__(self, TaskName, TaskPoints, TextDescription, Publisher):
        self.TaskName = TaskName
        self.TaskPoints = TaskPoints
        self.TextDescription = TextDescription
        self.Publisher = Publisher

class TaskSchema(ma.Schema):
    class Meta:
        fields = ('TaskId', 'TaskName', 'TaskPoints', 'TextDescription', 'DatePublished', 'Publisher')  # add 'CompletionStatus'

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)


class Questions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.String(200))
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.TaskId'), nullable=False)

    def __init__(self, question_text, task_id):
        self.question_text = question_text
        self.task_id = task_id

class QuestionSchema(ma.Schema):
    class Meta:
        fields = ('id', 'question_text', 'task_id')

question_schema = QuestionSchema()
questions_schema = QuestionSchema(many=True)

class Teams(db.Model):
    TeamId = db.Column(db.Integer, primary_key = True)
    TeamName = db.Column(db.String(50))
    Publisher = db.Column(db.String(50))
    DatePublished = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, TeamName, Publisher):
        self.TeamName = TeamName
        self.Publisher = Publisher


class TeamSchema(ma.Schema):
    class Meta:
        fields = ('TeamId', 'TeamName', 'DatePublished', 'Publisher')

team_schema = TeamSchema()
teams_schema = TeamSchema(many=True)

class Realtor_Teams(db.Model): 
    __tablename__ = 'realtor_teams'
    RealtorTeamId = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.String(32), db.ForeignKey('user.id'))
    TeamId = db.Column(db.Integer, db.ForeignKey('teams.TeamId'))

    user = db.relationship('User', backref=db.backref('Realtor_Teams', lazy=True))
    team = db.relationship('Teams', backref=db.backref('Realtor_Teams', lazy=True))

    def __init__(self, UserId, TeamId):
        self.UserId = UserId
        self.TeamId = TeamId

class Realtor_TeamsSchema(ma.Schema):
    class Meta:
        fields = ('RealtorTeamId', 'UserId', 'TeamId')

realtor_teams_schema = Realtor_TeamsSchema()
realtor_teams_schemas = Realtor_TeamsSchema(many=True)

class Team_Task(db.Model):
    __tablename__ = 'team_task'
    TeamTaskId = db.Column(db.Integer, primary_key=True)
    TeamId = db.Column(db.Integer, db.ForeignKey('teams.TeamId'))
    TaskId = db.Column(db.Integer, db.ForeignKey('tasks.TaskId'))

    team = db.relationship('Teams', backref=db.backref('team_task', lazy=True))
    task = db.relationship('Tasks', backref=db.backref('team_task', lazy=True))

    def __init__(self, TeamId, TaskId):
        self.TeamId = TeamId
        self.TaskId = TaskId

class Team_TaskSchema(ma.Schema):
    class Meta:
        fields = ('TeamTaskId', 'TeamId', 'TaskId')

team_task_schema = Team_TaskSchema()
team_tasks_schema = Team_TaskSchema(many=True)

class Realtor_Task(db.Model):
    __tablename__ = 'realtor_task'
    RealtorTaskId = db.Column(db.Integer, primary_key=True)
    RealtorId = db.Column(db.String(32), db.ForeignKey('user.id'))
    TaskId = db.Column(db.Integer, db.ForeignKey('tasks.TaskId'))
    QuestionId = db.Column(db.Integer, db.ForeignKey('questions.id')) 
    NumericAnswer = db.Column(db.Integer)
    DatePublished = db.Column(db.DateTime, default = datetime.datetime.now)

    realtor = db.relationship('User', backref=db.backref('realtor_task', lazy=True))
    task = db.relationship('Tasks', backref=db.backref('realtor_task', lazy=True))
    question = db.relationship('Questions', backref=db.backref('realtor_task', lazy=True)) 

    def __init__(self, RealtorId, TaskId, NumericAnswer, QuestionId):
        self.RealtorId = RealtorId
        self.TaskId = TaskId
        self.NumericAnswer = NumericAnswer
        self.QuestionId = QuestionId


class Realtor_TaskSchema(ma.Schema):
    class Meta:
        fields = ('RealtorTaskId', 'RealtorId', 'TaskId', 'NumericAnswer', 'QuestionId')

realtor_task_schema = Realtor_TaskSchema()
realtor_tasks_schema = Realtor_TaskSchema(many=True)



class Leaderboard(db.Model):
    __tablename__ = 'leaderboard'
    LeaderboardId = db.Column(db.Integer, primary_key=True)
    RealtorId = db.Column(db.String(32), db.ForeignKey('user.id'))
    TeamId = db.Column(db.Integer, db.ForeignKey('teams.TeamId'))
    Points = db.Column(db.Integer)

    realtor = db.relationship('User', backref=db.backref('leaderboard', lazy=True))
    team = db.relationship('Teams', backref=db.backref('leaderboard', lazy=True))


    def __init__(self, RealtorId, TeamId, Points):
        self.RealtorId = RealtorId
        self.TeamId = TeamId
        self.Points = Points
    

class LeaderboardSchema(ma.Schema):
    class Meta:
        fields = ('LeaderboardId', 'RealtorId', 'TeamId', 'Points', 'Name')
    Name = ma.Function(lambda obj: obj.realtor.Name)

leaderboard_schema = LeaderboardSchema()
leaderboards_schema = LeaderboardSchema(many=True)

class TaskCompletion(db.Model): 
    __tablename__ = 'task_completion'
    CompletionId = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.String(32), db.ForeignKey('user.id'))
    TaskId = db.Column(db.Integer, db.ForeignKey('tasks.TaskId'))
    CompletionStatus = db.Column(db.Boolean, default=False)

    user = db.relationship('User', backref=db.backref('task_completion', lazy=True))
    task = db.relationship('Tasks', backref=db.backref('task_completion', lazy=True))

    def __init__(self, UserId, TaskId, CompletionStatus=False):
        self.UserId = UserId
        self.TaskId = TaskId
        self.CompletionStatus = CompletionStatus

class TaskCompletionSchema(ma.Schema):
    class Meta:
        fields = ('CompletionId', 'UserId', 'TaskId', 'CompletionStatus')

task_completion_schema = TaskCompletionSchema()
task_completions_schema = TaskCompletionSchema(many=True)

class Analytics(db.Model): 
    __tablename__ = 'analytics'
    AnalyticsId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    RealtorId = db.Column(db.String(32), db.ForeignKey('user.id'))
    TaskId = db.Column(db.Integer, db.ForeignKey('tasks.TaskId'))
    WeekStartDate = db.Column(db.Date)
    WeeklyTotal = db.Column(db.Integer)
    MonthStartDate = db.Column(db.Date)
    MonthlyAverage = db.Column(db.Integer)

    user = db.relationship('User', backref=db.backref('analytics', lazy=True))
    task = db.relationship('Tasks', backref=db.backref('analytics', lazy=True))

    def __init__(self, RealtorId, TaskId, WeekStartDate, WeeklyTotal, MonthStartDate, MonthlyAverage):
        self.RealtorId = RealtorId
        self.TaskId = TaskId
        self.WeekStartDate = WeekStartDate
        self.WeeklyTotal = WeeklyTotal
        self.MonthStartDate = MonthStartDate
        self.MonthlyAverage = MonthlyAverage

class AnalyticsSchema(ma.Schema):
    class Meta:
        fields = ('AnalyticsId', 'RealtorId', 'TaskId', 'WeekStartDate', 'WeeklyTotal', 'MonthStartDate', 'MonthlyAverage', 'TaskName')
        
    TaskName = ma.Function(lambda obj: obj.task.TaskName)

analytics_schema = AnalyticsSchema()
analytics_schema_many = AnalyticsSchema(many=True)

def add_task_completions_for_user(user_id):
    realtor_teams = Realtor_Teams.query.filter_by(UserId=user_id).all()

    for realtor_team in realtor_teams:
        team_id = realtor_team.TeamId

        team_tasks = Team_Task.query.filter_by(TeamId=team_id).all()

        for team_task in team_tasks:
            task_completion_entry = TaskCompletion(UserId=user_id, TaskId=team_task.TaskId, CompletionStatus=False)
            db.session.add(task_completion_entry)
    db.session.commit()


@app.route("/register", methods = ['POST'])
def register_user():
    Name = request.json["Name"]
    Email = request.json["Email"]
    Password = request.json["Password"]

    user_exists = User.query.filter_by(Email = Email).first() is not None
    if user_exists:
        return jsonify({"error": "User already exists"}), 409
    hashed_password = bcrypt.generate_password_hash(Password)
    new_user = User(Name=Name, Email = Email, Password = hashed_password)
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


    return jsonify(user=user_schema.dump(new_user), access_token=access_token), 200




@app.route("/login", methods = ['POST'])
def login_user():
    Email = request.json['Email']
    Password = request.json['Password']

    user = User.query.filter_by(Email=Email).first()

    if user is None or not bcrypt.check_password_hash(user.Password, Password):
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=user.id)
    user_data = user_schema.dump(user)

    return jsonify(user=user_data, access_token=access_token), 200

@app.route("/token", methods = ["POST"])
def create_token():

    return ""

@app.route("/get", methods = ['GET'])
def get_articles():
    return jsonify({"Hello": "World"})


@app.route("/addTask", methods = ['POST'])
def add_tasks():
    TaskName = request.json['TaskName']
    TaskPoints = request.json['TaskPoints'] 
    TextDescription = request.json['TextDescription']
    Publisher = request.json['Publisher']
    questions = request.json['Questions']
    
    task = Tasks(TaskName, TaskPoints, TextDescription, Publisher)
    db.session.add(task)
    db.session.commit()

    for question_text in questions:
        question = Questions(question_text, task.TaskId)
        db.session.add(question)
    db.session.commit()

    return task_schema.jsonify(task)

@app.route("/addTeam", methods = ['POST'])
def add_teams():
    TeamName = request.json['TeamName']
    Publisher = request.json['Publisher']

    
    team = Teams(TeamName, Publisher)
    db.session.add(team)
    db.session.commit()

    return team_schema.jsonify(team)

@app.route("/addToTeam", methods=['POST'])
def add_to_team():
    UserName = request.json['UserName']
    TeamName = request.json['TeamName']

    user = User.query.filter_by(Name=UserName).first()
    team = Teams.query.filter_by(TeamName=TeamName).first()

    if user is None or team is None:
        return jsonify({'error': 'User or team not found'}), 404

    realtor_team = Realtor_Teams(user.id, team.TeamId)
    db.session.add(realtor_team)

    leaderboard_entry = Leaderboard(user.id, team.TeamId, 0, user.Name)
    db.session.add(leaderboard_entry)

    team_tasks = Team_Task.query.filter_by(TeamId=team.TeamId).all()

    for task in team_tasks:
        task_completion = TaskCompletion(user.id, task.TaskId, False)
        db.session.add(task_completion)

    db.session.commit()

    return realtor_teams_schema.jsonify(realtor_team)



@app.route("/addTaskToTeam", methods=['POST'])
def add_task_to_team():
    TeamName = request.json['TeamName']
    TaskName = request.json['TaskName']

    team = Teams.query.filter_by(TeamName=TeamName).first()
    task = Tasks.query.filter_by(TaskName=TaskName).first()

    if team is None or task is None:
        return jsonify({'error': 'Team or task not found'}), 404

    team_task = Team_Task(team.TeamId, task.TaskId)
    db.session.add(team_task)
    db.session.commit()

    return team_task_schema.jsonify(team_task)

@app.route("/user_teams/<user_id>", methods=['GET'])
@jwt_required()
def get_user_teams(user_id):

    user_id = get_jwt_identity()
    user_teams = Realtor_Teams.query.filter_by(UserId=user_id).all()
    teams = [Teams.query.get(team.TeamId) for team in user_teams]

    return jsonify(teams_schema.dump(teams))


@app.route("/leaderboard", methods=['GET'])
@jwt_required()
def get_user_leaderboard():
    
    user_leaderboard_entries = Leaderboard.query.all()
    serialized_data = leaderboards_schema.dump(user_leaderboard_entries)
    return jsonify(serialized_data)

@app.route("/user/<user_id>", methods=['GET'])
@jwt_required()
def get_user(user_id):
    user_id_from_token = get_jwt_identity()

    if user_id_from_token != user_id:
        return jsonify({"message": "Unauthorized"}), 401

    user = User.query.get(user_id)

    if user is None:
        return jsonify({"message": "User not found"}), 404

    return jsonify(user_schema.dump(user))

@app.route("/team_tasks/<team_id>", methods=['GET'])
@jwt_required()
def get_team_tasks(team_id):
    team_tasks = Team_Task.query.filter_by(TeamId=team_id).all()

    if not team_tasks:
        return jsonify({"message": "No tasks found for this team"}), 404

    tasks = [Tasks.query.get(task.TaskId) for task in team_tasks]

    tasks_response = [{column.name: getattr(task, column.name) for column in task.__table__.columns} for task in tasks]

    return jsonify(tasks_response)

@app.route("/getTaskCompletion/<team_id>/<user_id>", methods=['GET'])
@jwt_required()
def get_task_completion(user_id, team_id):
    team_tasks = Team_Task.query.filter_by(TeamId=team_id).all()

    task_ids = [task.TaskId for task in team_tasks]

    user_tasks_completion = TaskCompletion.query.filter(TaskCompletion.UserId == user_id, TaskCompletion.TaskId.in_(task_ids)).all()

    if not user_tasks_completion:
        return jsonify({"message": "No tasks completion entries found for this user"}), 404

    result = [{'TaskId': task_completion.TaskId, 'UserId': task_completion.UserId, 'CompletionStatus': task_completion.CompletionStatus} for task_completion in user_tasks_completion]

    return jsonify(result)

@app.route("/getQuestions/<task_id>", methods=['GET'])
@jwt_required()
def get_Questions(task_id):

    questions = Questions.query.filter_by(task_id=task_id).all()

    if not questions:
        return jsonify([]), 200


    result = questions_schema.dump(questions)
    return jsonify(result)

@app.route("/createRealtorTask/<userId>", methods=['POST'])
@jwt_required()
def create_realtor_task(userId):
    print(request.json)
    realtor_id = userId
    task_id = request.json['TaskId']
    numeric_answer = request.json['NumericAnswer']
    question_id = request.json.get('QuestionId')  

    new_realtor_task = Realtor_Task(realtor_id, task_id, numeric_answer, question_id)

    db.session.add(new_realtor_task)

    task_completion = TaskCompletion.query.filter_by(TaskId=task_id).first()
    if task_completion is not None:
        task_completion.CompletionStatus = True
    else:
        return jsonify({"message": "No matching task_completion record found for the provided TaskId"}), 400

    task_points = Tasks.query.get(task_id).TaskPoints  
    team_id = request.json['TeamId']  
    leaderboard_record = Leaderboard.query.filter_by(RealtorId=userId, TeamId=team_id).first()
    if leaderboard_record is not None:
        leaderboard_record.Points += task_points  
    else:
        return jsonify({"message": "No matching Leaderboard record found for the provided RealtorId and TeamId"}), 400

    db.session.commit()

    return realtor_task_schema.jsonify(new_realtor_task)

@app.route("/getAnalytics/<user_id>", methods=['GET'])
@jwt_required()
def get_Analytics(user_id):
    analytics_weekly = db.session.query(Analytics, Tasks.TaskName).join(Tasks, Analytics.TaskId == Tasks.TaskId).filter(
        Analytics.RealtorId == user_id, 
        Analytics.WeeklyTotal.isnot(None)
    ).order_by(Analytics.WeekStartDate.desc()).limit(4).all()

    analytics_monthly = db.session.query(Analytics, Tasks.TaskName).join(Tasks, Analytics.TaskId == Tasks.TaskId).filter(
        Analytics.RealtorId == user_id, 
        Analytics.MonthlyAverage.isnot(None)
    ).order_by(Analytics.MonthStartDate.desc()).limit(4).all()

    if not analytics_weekly and not analytics_monthly:
        return jsonify({"message": "No analytics found for this user"}), 404

    result_weekly = [{'analytics': analytics_schema.dump(item[0]), 'TaskName': item[1]} for item in analytics_weekly]
    result_monthly = [{'analytics': analytics_schema.dump(item[0]), 'TaskName': item[1]} for item in analytics_monthly]

    return jsonify({
        "weekly": result_weekly, 
        "monthly": result_monthly
    })



if __name__ == "__main__":
    from server import app, db

    with app.app_context():
      db.create_all()

    app.run(debug=True)