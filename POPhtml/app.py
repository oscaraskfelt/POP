from flask import Flask, request, render_template
app = Flask("POPhtml", static_url_path='/static')
app = Flask(__name__.split('.')[0])

@app.route('/')
def sign_in():
    return render_template('index.html')

@app.route('/kalender')
def calendar():
    return render_template('kalender.html')

@app.route('/test')
def test():
    return render_template('_new_task.html')

@app.route('/new_task', methods=["POST"])
def get_data():
    dic = {}
    task_title = request.form['task_head']
    task_content = request.form['task_content']
    #task_prio = request.form['task_prio']
    #task_date = request.form['new_task_date']

    return render_template('test.html', lista=data)

