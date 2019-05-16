import psycopg2


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
    cursor.execute('''select * from task where popper = %s order by slutdatum''', (popper,))
    data = cursor.fetchall()
    cursor.close()
    return data


def add_task(title, content, prio, enddate, user):
    '''Sparar datan till db'''
    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()
    cursor.execute('''INSERT INTO task (title, content, prio, slutdatum, popper)
                        VALUES (%s, %s, %s, %s, %s);''', (title, content, prio, enddate, user))
    conn.commit()
    cursor.close()


def get_tasks_near_deadline(popper):
    '''Hämtar de tasks som har deadline de 3 närmsta dagarna'''
    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()

    cursor.execute('''select * from task where popper = %s and slutdatum between (now() - interval '1 day') and (now() + interval '3 day') order by slutdatum;''', (popper,))
    data = cursor.fetchall()
    cursor.close()
    return data 


def get_tasks_passed_deadline(popper):
    '''Hämtar de tasks som har passerat deadline'''
    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()

    cursor.execute('''select title, prio, content, popper, slutdatum, DATE_PART('day', now() - slutdatum)::integer from task where popper = %s and slutdatum < (now() - interval '1 day') order by slutdatum;''', (popper,))
    tasks = cursor.fetchall()
    cursor.close()
    return tasks


def edit_task(title, content, prio, enddate, ide):
    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()
    cursor.execute('''UPDATE task SET 
                        title = %s,
                        content = %s,
                        prio = %s,
                        slutdatum = %s 
                        WHERE id = %s;''', (title, content, prio, enddate, ide,))
    conn.commit()
    cursor.close()

