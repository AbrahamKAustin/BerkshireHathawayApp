from Shared.config import db, datetime, uuid4, ma


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

