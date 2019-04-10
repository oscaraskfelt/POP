# coding: utf-8
import psycopg2

def get_user():
    '''Hämtar info om användare'''

    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()
    cursor.execute("select * from popper;")
    user = cursor.fetchall()
    cursor.close()
    return user

def check_user(username, pwd):
    user = get_user()

    for u in user:
        if username == u[0] and pwd == u[2]:
            return True

def get_user_name(username):
    user = get_user()

    for i in user:
        if i[0] == username:
            namn = i[1]
            return namn
