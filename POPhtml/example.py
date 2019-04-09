import psycopg2

def get_tasks():
    '''Hämtar task från databasen'''
    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()
    cursor.execute("select * from task")
    data = cursor.fetchall()
    cursor.close()
    return data


#ok = get_data()
#print(ok)

