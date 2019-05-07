import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime, timedelta


def get_tasks():
    '''Hämtar task från databasen'''
    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()
    cursor.execute('''select * from task''')
    data = cursor.fetchall()
    cursor.close()
    return data


def get_tasks_per_user(popper):
    '''Hämtar task från databasen för specifika användare'''
    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()
    cursor.execute('''select * from task where popper = '{}' order by slutdatum'''.format(popper))
    data = cursor.fetchall()
    cursor.close()
    return data


def add_task(title, content, prio, enddate, user):
    '''Sparar datan till db'''
    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()
    cursor.execute('''INSERT INTO task (title, content, prio, slutdatum, popper)
                        VALUES ('{}', '{}', '{}', '{}', '{}')'''.format(title, content, prio, enddate, user))
    conn.commit()
    cursor.close()


def get_tasks_near_deadline(popper):
    '''Hämtar de tasks som har deadline de 3 närmsta dagarna'''
    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()

    datum_nu = (datetime.now() - timedelta(days=1))
    datum_sen = (datetime.now() + timedelta(days=3))  

    cursor.execute('''select * from task where popper = '{}' and slutdatum between '{}' and '{}' order by slutdatum;'''.format(popper, datum_nu, datum_sen))
    data = cursor.fetchall()
    cursor.close()
    return data 

