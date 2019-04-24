# coding: utf-8
import psycopg2

def get_tasks():
    '''Hämtar task från databasen'''
    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()
    cursor.execute("select * from task")
    data = cursor.fetchall()
    cursor.close()
    return data


def get_tasks_per_user(popper):
    '''Hämtar task från databasen för specifika användare'''
    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()
    cursor.execute("select * from task where popper = '{}'".format(popper))
    data = cursor.fetchall()
    cursor.close()
    return data


def add_task(title, content, prio, date, enddate):
    '''sparar ner datan till db'''
    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()
    cursor.execute('''INSERT INTO task (title, content, prio, startdatum, slutdatum)
                        VALUES ('{}', '{}', '{}', '{}', '{}' )'''.format(title, content, prio, date, enddate))
    conn.commit()
    cursor.close()


