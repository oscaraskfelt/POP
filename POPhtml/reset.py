from flask import Flask, render_template, redirect
from flask_mail import Mail, Message
import psycopg2


def reset_password(password, user):
    '''Skickar query för att uppdatera lösenord'''
    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()
    cursor.execute('''UPDATE popper SET losenord = %s where epost = %s ''', (password, user,))
    cursor.close()
    conn.commit()
    return True


def send_email(user_mail):
    '''Skickar email med länk för att ange nytt lösenord'''
    msg = Message("Lösenord pew pew! Pop pop!",
                  recipients=["{}".format(user_mail)])
    msg.body = "http://127.0.0.1:5000/reset/{}".format(user_mail)
    msg.html = render_template('email_template.html', email=user_mail)
    return msg


def reset_user_name(new_popper_name, user):
    '''Skickar query för att uppdatera användarnamn'''
    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()
    cursor.execute('''UPDATE popper SET popper_name = %s where epost = %s ''', (new_popper_name, user,))
    cursor.close()
    conn.commit()
    return True