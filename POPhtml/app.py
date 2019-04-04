from flask import Flask, request, render_template
app = Flask("POPhtml", static_url_path='/static')
app = Flask(__name__.split('.')[0])

@app.route('/')
def sign_in():
    return render_template('index.html')

@app.route('/kalender')
def calendar():
    return render_template('kalender.html')

