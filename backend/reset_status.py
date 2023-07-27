from server import app, db, TaskCompletion

with app.app_context():
    tasks = TaskCompletion.query.all()

    for task in tasks:
        task.CompletionStatus = False

    db.session.commit()
