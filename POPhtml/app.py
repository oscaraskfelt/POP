# coding: utf-8
from flask import Flask, request, render_template
app = Flask("POPhtml", static_url_path='/static')
app = Flask(__name__.split('.')[0])
import dbconn

@app.route('/')
def login():
    '''Returnerar startsidan'''
    return render_template('index.html')

@app.route('/login_form', methods=["POST"])
def check_login():
    '''Kontrollerar uppgifter användaren skriver in i "/" gentemot databasen'''

    username = getattr(request.form['username'])
    password = getattr(request.form['password'])

    user = example.get_user()

    for u in user:
        if username == u[0]:
            return("woho!")
        else:
            return("det finns ingen med det användarnamnet")

@app.route('/signup_form', methods=["POST"])
def check_signup():
    '''Tar in uppgifter och skapar ny användare'''

    reg = request.form['reg']
    pw_reg = request.form['pw_reg']

@app.route('/kalender')
def calendar():
    '''Returnerar kalendervy'''
    return render_template('kalender.html')

@app.route('/test')
def test():
    return render_template('_new_task.html')

@app.route('/new_task', methods=["POST", "GET"])
def get_data():
    '''Laddar data från databas'''
    if request.method == "POST":
        task_title = request.form['new_task_header']
        task_content = request.form['task_content']
        task_prio = request.form['task_prio']
        task_date = request.form['new_task_date']
        task_enddate = request.form['new_task_enddate']
        dbconn.add_task(task_title, task_content, task_prio, task_date, task_enddate)
        data = dbconn.get_tasks()
        return render_template('test.html', lista=data)
    else:
        data = dbconn.get_tasks()
        return render_template('test.html', lista=data)


