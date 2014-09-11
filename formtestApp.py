# In this example we are going to create a simple HTML
# page with 2 input fields (numbers), and a link.
# Using jQuery we are going to send the content of both
# fields to a route on our application, which will
# sum up both numbers and return the result.
# Again using jQuery we'l show the result on the page


# We'll render HTML templates and access data sent by GET
# using the request object from flask. jsonigy is required
# to send JSON as a response of a request
from flask import Flask, render_template, request, jsonify, \
    session, g, redirect, url_for, abort, flash
import ConfigParser
from contextlib import closing
import sqlite3

# This isn't getting passed into the layout. Needs to be a parameter in 
# render_template()
scoreboard=[{'name':"test entry", 'score':1}, 
            {'name':"test entry", 'score':2}]

config = ConfigParser.ConfigParser()
config.read('settings.cfg')
     
# configuration
DATABASE = config.get('DATABASE','database')
#DEBUG = True
SECRET_KEY = config.get('DATABASE','secret_key')
USERNAME = config.get('DATABASE','user')
PASSWORD = config.get('DATABASE','pass')


# Initialize the Flask application
app = Flask(__name__)
app.config.from_object(__name__) # should be able to read in directly from config file
app.debug=True

def init_db():
    try:
        with closing(connect_db()) as db:
            with app.open_resource('schema.sql', mode='r') as f:
                script = f.read()
                #print script
                db.cursor().executescript(script)
            db.commit()
            print "Schema constructed"
    except sqlite3.OperationalError: # Need more specific error handling here
        print "Database already initialized"
    #except Exception, e:
    #    raise e

def connect_db():
    return sqlite3.connect(app.config['DATABASE'])

@app.before_request
def before_request():
    g.db = connect_db()
    
@app.teardown_request
def teardown_request(exception):
    db = getattr(g, 'db', None)
    if db is not None:
        db.close()
    
# This route will show a form to perform an AJAX request
# jQuery is loaded to execute the request and update the
# value of the operation
@app.route('/')
def index():
    return render_template('index.html')

def persist_data(name, company, email, elapsed, difficulty, win):
    g.db.execute('insert into entries (name, company, email, elapsed, difficulty, win) values (?, ?, ?, ?, ?, ?)',
                 [name, company, email, elapsed, difficulty, win])
    print "committing?"
    g.db.commit()
    print "persisted?"
    flash('New entry was successfully posted')
    
# Route that will process the AJAX request, sum up two
# integer numbers (defaulted to zero) and return the
# result as a proper JSON response (Content-Type, etc.)
@app.route('/_submit_contact_info')
def submit_contact_info():
    name = request.args.get('name', "", type=str)    
    company = request.args.get('company', "", type=str)
    email = request.args.get('email', "", type=str)
    elapsed = request.args.get('elapsed', "", type=str)
    difficulty = request.args.get('difficulty', "", type=str)
    win = request.args.get('win', "", type=str)
    data = [name, company, email, elapsed, difficulty, win]
    if any(d!='' for d in data[:3]):
        persist_data(*data)
    return jsonify(result=None)

@app.route('/_load_scoreboard')
def load_scoreboard():
    top_scores = g.db.execute("SELECT difficulty, name, elapsed FROM entries WHERE win = 'true' ORDER BY elapsed LIMIT 10").fetchall()
    n=len(top_scores)
    difficulty, name, elapsed = zip(*top_scores)
    elaps_str = [str(e) for e in elapsed]
    seconds = [s[:-1] for s in elaps_str]
    dec_sec = [s[-1] for s in elaps_str]
    elaps_str = ['{sec}.{dec}'.format(sec=s, dec=dec_sec[i]) for i,s in enumerate(seconds)]
    
    scores=[]
    for i in range(n):
        scores.append({'difficulty':difficulty[i], 'name':name[i],'score':elaps_str[i]})
    print scores
    return jsonify(result=scores)
        
    
if __name__ == '__main__':
    init_db()
    app.run()