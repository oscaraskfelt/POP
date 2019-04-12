# coding: utf-8
import psycopg2

def get_user():
    '''Hämtar info om alla användare i databasen'''

    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()
    cursor.execute("select * from popper;")
    user = cursor.fetchall()
    cursor.close()
    return user

def check_user(username, pwd):
    '''Kontrollerar användares input i formulär gentemot uppgifter i databasen'''
    user = get_user()

    for u in user:
        if username == u[0] and pwd == u[2]:
            return True

def get_user_name(username):
    '''Söker fram användares namn med användarnamnet som användaren fyllt i i formulär'''
    user = get_user()

    for i in user:
        if i[0] == username:
            namn = i[1]
            return namn
