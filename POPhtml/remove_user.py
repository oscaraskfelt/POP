# coding: utf-8
import psycopg2

def delete_user(user_id):
    '''Tar bort tasks och användare från databas'''
    try:
        conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
        cursor = conn.cursor()
        cursor.execute("DELETE FROM task WHERE popper = %s", (user_id,))
        cursor.execute("DELETE FROM popper WHERE epost = %s", (user_id,))
        conn.commit()
        cursor.close()
    except Exception as e:
        print("Error in Delete operation")
        print(task_id)
        print(e)