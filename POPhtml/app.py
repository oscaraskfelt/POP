#!/usr/bin/python3
# coding: utf-8
from flask import Flask, request, render_template, redirect, url_for, make_response
from flask_mail import Mail, Message
import task
import sign_in
import reg_user
import reset
app = Flask("POPhtml", static_url_path='/static')
app = Flask(__name__.split('.')[0])
app.config.update(
    DEBUGGER=True,
    #email settings
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = 465,
    MAIL_USE_SSL = True,
    MAIL_DEFAULT_SENDER = 'pop.pop.it1@gmail.com',
    MAIL_USERNAME = 'pop.pop.it1@gmail.com',
    MAIL_PASSWORD = 'Poppers1'
)
mail = Mail(app)


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
    popper = request.cookies.get('user_id')
    data = task.get_tasks_per_user(popper)
    return render_template('timelinet.html', tasks = data) 


@app.route('/new_task', methods=["POST", "GET"])
def add_data():
    '''Laddar data från databas'''
    popper = request.cookies.get('user_id')
    if request.method == "POST":
        task_title = request.form['new_task_header']
        task_content = request.form['task_content']
        task_prio = request.form['task_prio']
        task_date = request.form['new_task_date']
        task_enddate = request.form['new_task_enddate']
        user = request.cookies.get('user_id')

        task.add_task(task_title, task_content, task_prio, task_date, task_enddate, user)
        data = task.get_tasks_per_user(popper)
        return render_template('timelinet.html', tasks = data)
    else:
        data = task.get_tasks_per_user(popper)
        return render_template('timelinet.html', tasks = data)


@app.route('/reset')
def reset_page():
    '''Returnerar formulär för att ange epost till lösenordsåterställning'''
    return render_template('reset.html')


@app.route('/reset_pw', methods=["POST"])
def send_reset_email():
    '''Hämtar epostadress och skrickar en HTML-länk för att skapa nytt lösenord'''
    try:
        user_email = request.form['pw_reset']
        if sign_in.check_email(user_email) == True:
            msg = reset.send_email(user_email)
            mail.send(msg)
            return render_template('index.html')
        else:
            return render_template('reset.html', error=True)
    except:
        message = "Mail-kommunikationen fungerade inte"
        return render_template('error.html', error=message)


@app.route('/reset/<user>')
def reset_handler(user):
    '''Hanterar lösenordsåterställning'''
    add_cookie = make_response(render_template('new_password.html'))
    add_cookie.set_cookie('user', user)
    return add_cookie


@app.route('/update_password', methods=["POST"])
def update_password():
    '''Hämtar nytt lösenord för användaren och skickar det till DB'''
    user = request.cookies.get('user')
    new_pw = request.form['new_pw']
    if reset.reset_password(new_pw, user) == True:
        return render_template('index.html', title="uppdaterat pw")
    else:
        return render_template('error.html', error="Lösenordet blev inte uppdaterat")