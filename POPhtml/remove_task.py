# coding: utf-8
import psycopg2

def remove_task(id)
    '''Tar bort task från databas'''
    try:
        conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
        cursor = conn.cursor()
        cur.execute("DELETE FROM task WHERE id = %s", (id,))
        conn.commit()
        count = cursor.rowcount
        print(count, "Record deleted successfully ")
    except (Exception, psycopg2.Error) as error:
        print("Error in Delete operation", error)
    finally: 
        if (connection):
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")