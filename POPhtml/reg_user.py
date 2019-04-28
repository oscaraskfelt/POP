# coding: utf-8
import psycopg2


def get_epost():
    '''Hämtar alla resultat från kolumn epost användare från db'''
    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()
    cursor.execute('''select epost from popper''')
    epost = cursor.fetchall()
    cursor.close()
    return epost


def epost_validation(epost, new_epost):
    ''''Kontrollerar att epostadressen inte är upptagen, returnerar False om den finns'''
    for e in epost:
        if e[0] == new_epost:
            return False
    return True


def reg_user(epost, popper_name, losenord):
    '''Registrerar användare'''
    conn = psycopg2.connect(dbname='pop', user='ai8812', password='wtrikq2c', host='pgserver.mah.se')
    cursor = conn.cursor()
    cursor.execute('''INSERT INTO popper (epost, popper_name, losenord)
                        VALUES ('{}', '{}', '{}' )'''.format(epost, popper_name, losenord))
    conn.commit()

