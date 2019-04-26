#!/usr/bin/python3
# coding: utf-8
from flask import Flask, request, render_template, redirect, url_for, make_response
app = Flask("POPhtml", static_url_path='/static')
app = Flask(__name__.split('.')[0])
# import sys
# if sys.version_info.major < 3:
#     reload(sys)
# sys.setdefaultencoding('utf8')
import dbconn
import sign_in
import reg_user


@app.route('/')
def login():
    '''Returnerar startsidan'''
    return render_template('index.html')


@app.route('/login', methods=["POST"])
def check_login():
    '''Kontrollerar uppgifter användaren skriver in i "/" gentemot databasen'''

    username = request.form['username']
    password = request.form['password']

    user = sign_in.check_user(username, password)
    name = sign_in.get_user_name(username)
    
    if user == True:
        add_cookie = make_response(redirect(url_for('welcome_user', pagename=name)))
        add_cookie.set_cookie('user_id', username)
        return add_cookie
    else:
        message = "Felaktigt användarnamn eller lösenord"
        return render_template('error.html', error=message, title="ERROR")


@app.route('/welcome_user/<pagename>') 
def welcome_user(pagename):
    return render_template('welcome_user.html', pagename=pagename)


@app.route('/signup', methods=["POST"])
def check_signup():
    '''Tar in uppgifter och skapar ny användare'''
    epost = reg_user.get_epost()
    reg_epost = request.form['reg_epost']
    reg_popper_name = request.form['popper_name']
    reg_pw = request.form['pw_reg']

    if reg_user.epost_validation(epost, reg_epost) == True:
        reg_user.reg_user(reg_epost, reg_popper_name, reg_pw)
        return render_template('test.html', lista=epost)

    else:
        return render_template('error.html', error="Eposten redan registrerad")


@app.route('/kalender')
def calendar():
    '''Returnerar kalendervy'''
    return render_template('cal2.html')

@app.route('/tidslinje')
def timeline():
    '''Returnerar vy över tidslinje'''
    return render_template('timelinet.html')

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


