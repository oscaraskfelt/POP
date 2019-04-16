import psycopg2

def get_user():
    ''' hämtar alla användare från db'''
    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()
    cursor.execute("select epost from popper")
    epost = cursor.fetchall()
    cursor.close()
    return epost

def epost_validation(epost):
    ''''kontrollerar att epostadressen inte är upptagen'''
    reg = request.form['reg']
    for e in reg:
        if e == epost:
            pass
        



def reg_user(epost, losenord):
    '''Registrerar användare'''

    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()
    cursor.execute('''INSERT INTO popper (epost, popper_name, losenord)
                        VALUES ('{}', '{}', '{}' )'''.format(epost, popper_name, losenord))
    conn.commit()


print(get_user())
