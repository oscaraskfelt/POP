from flask import Flask, request, render_template
app = Flask("POPhtml", static_url_path='/static')
app = Flask(__name__.split('.')[0])

@app.route('/')
def hello():
    return render_template('index.html')


