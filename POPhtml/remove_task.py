# coding: utf-8
import psycopg2

def pop_task(task_id):
    '''Tar bort task från databas'''
    try:
        conn = psycopg2.connect(dbname='pop', user='ai8812', password='password', host='pgserver.mah.se')
        cursor = conn.cursor()
        cursor.execute("DELETE FROM task WHERE id = %s", (task_id,))
        conn.commit()
        cursor.close()
    except Exception as e:
        print("Error in Delete operation")
        print(task_id)
        print(e)