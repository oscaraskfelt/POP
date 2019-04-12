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
