from flask import Flask, request, render_template, redirect, url_for, make_response
from flask_mail import Mail, Message
import task
import sign_in
import reg_user
import reset
import remove_task
import remove_user
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

    username = request.form['username'].lower()
    password = request.form['passw']
    msg = "1"

    user = sign_in.check_user(username, password)
    name = sign_in.get_user_name(username)
    
    
    if user == True:
        add_cookie = make_response(redirect(url_for('welcome_user', pagename=name)))
        add_cookie.set_cookie('user_id', username)
        add_cookie.set_cookie('logged_in', "True")
        add_cookie.set_cookie('popper_name', name)
        add_cookie.set_cookie('msg', msg)
        return add_cookie
    else:
        message = "Felaktigt användarnamn eller lösenord"
        return render_template('error.html', error=message, title="ERROR")


@app.route('/welcome_user/<pagename>')
def welcome_user(pagename):
    if logged_in_status() == True:
        popper = request.cookies.get('user_id')
        popper_name = request.cookies.get('popper_name')
        data = task.get_tasks_near_deadline(popper)
        tasks = task.get_tasks_passed_deadline(popper)
        msg = request.cookies.get('msg')
        return render_template('welcome_user.html', pagename=pagename, msg=msg,  data=data, tasks=tasks, user=popper_name)
    else:
        return render_template('error.html', error="Logga in först")


@app.route('/signup', methods=["POST"])
def check_signup():
    '''Tar in uppgifter och skapar ny användare'''
    epost = reg_user.get_epost()
    reg_epost = request.form['reg_epost'].lower()
    reg_popper_name = request.form['popper_name'].strip()
    reg_pw = request.form['pw_reg']
    msg = "2"

    if reg_user.epost_validation(epost, reg_epost) == True:
        reg_user.reg_user(reg_epost, reg_popper_name, reg_pw)
        add_cookie_reg = make_response(redirect(url_for('welcome_user', pagename=reg_popper_name)))
        add_cookie_reg.set_cookie('user_id', reg_epost)
        add_cookie_reg.set_cookie('popper_name', reg_popper_name)
        add_cookie_reg.set_cookie('logged_in', "True")
        add_cookie_reg.set_cookie('msg', msg)
        return add_cookie_reg
    else:
        return render_template('error.html', error="Eposten redan registrerad")


@app.route('/calendar')
@app.route('/kalender')
def kalender():
    '''Returnerar kalendervy'''
    if logged_in_status() == True:
        popper = request.cookies.get('user_id')
        popper_name = request.cookies.get('popper_name')
        data = task.get_tasks_per_user(popper)
        return render_template('cal2.html', tasks=data, user=popper_name, pagename=popper_name)
    else:
        return render_template('error.html', error="Vänligen logga in först")


@app.route('/timeline')
@app.route('/tidslinje')
def tidslinje():
    '''Returnerar vy över tidslinje'''
    if logged_in_status() == True:
        popper = request.cookies.get('user_id')
        popper_name = request.cookies.get('popper_name')
        data = task.get_tasks_per_user(popper)
        return render_template('timelinet.html', user=popper_name, tasks=data, pagename=popper_name)
    else:
        return render_template('error.html', error="Logga in först")


@app.route('/new_task', methods=["POST"])
def add_data():
    '''Lägger till data från databas och returnerar till ursprungssidan annars welcome_user'''
    if logged_in_status() == True:
        try:
            task_title = request.form['new_task_header']
            task_content = request.form['task_content']
            task_prio = request.form['task_prio']
            task_enddate = request.form['new_task_enddate']
            user = request.cookies.get('user_id')

            origin_path = request.referrer.split("/")[3]
            task.add_task(task_title, task_content, task_prio, task_enddate, user)
            if origin_path == 'timeline' or origin_path == 'tidslinje':
                return redirect(url_for('tidslinje'))
            elif origin_path =='calendar' or origin_path == 'kalender':
                return redirect(url_for('kalender'))
            elif origin_path == 'settings':
                popper = request.cookies.get('user_id')
                return redirect(url_for('settings', pagename=popper))
            else:
                popper = request.cookies.get('user_id')
                return redirect(url_for('welcome_user', pagename=popper))
        except:
            popper = request.cookies.get('user_id')
            return redirect(url_for('welcome_user', pagename=popper))
    else:
        return render_template('error.html', error="Logga in först")


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
            return redirect(url_for('login'))
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


@app.route('/reset_password', methods=["POST"])
def reset_password():
    '''Hämtar nytt lösenord för användaren och skickar det till DB'''
    user = request.cookies.get('user')
    new_pw = request.form['new_pw']
    if reset.reset_password(new_pw, user) == True:
        return redirect(url_for('login'))
    else:
        return render_template('error.html', error="Lösenordet blev inte uppdaterat")


@app.errorhandler(404)
def page_not_found(e):
    '''404 hanterare'''
    return render_template('error.html', error="404 - sidan finns inte")


@app.route('/log_out', methods=["POST"])
def log_out():
    log_out = make_response(redirect(url_for('login')))
    log_out.set_cookie('logged_in', "False")
    return log_out


def logged_in_status():
    logged_in = request.cookies.get('logged_in')
    if logged_in == "True":
        return True
    else:
        return False


@app.route('/settings/<pagename>') 
def settings(pagename):
    if logged_in_status() == True:
        popper = request.cookies.get('user_id')
        data = sign_in.get_one_user(popper)
        return render_template('settings.html', pagename=pagename, user=pagename, data=data)
    else:
        return render_template('error.html', error="Logga in först")


@app.route('/poptask', methods=["POST"])
def task_remove():
    if logged_in_status() == True:
        task_id = request.form['task_id']
        remove_task.pop_task(task_id)

        popper = request.cookies.get('user_id')
        popper_name = request.cookies.get('popper_name')
        data = task.get_tasks_per_user(popper)
        return render_template('timelinet.html', user=popper_name, tasks=data)
    else:
        return render_template('error.html', error="Logga in först")


@app.route('/remove_user', methods=["POST"])
def user_remove():
    if logged_in_status() == True:
        user_id = request.cookies.get('user_id')
        remove_user.delete_user(user_id)

        remove_account = make_response(redirect(url_for('login')))
        remove_account.set_cookie('logged_in', "False")
        return remove_account
    else:
        return render_template('error.html', error="Logga in först")


@app.route('/update_pw', methods=["POST"])
def update_user():
    if logged_in_status() == True:
        popper_name = request.cookies.get('popper_name')
        id = request.cookies.get('user_id')
        new_pw = request.form['pw_reg']

        reset.reset_password(new_pw, id)
        return redirect(url_for('settings', pagename=popper_name))
    else:
        return render_template('error.html', error="Logga in först")