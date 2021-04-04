import mysql.connector as msc
from flask import Flask
from flask_cors import CORS
from flask import request

app = Flask(__name__)
CORS(app)

# Note: I created a dummy user for this with user_id: 0 and user_name: user0

@app.route('/show_beth_adv_query_result')
def show_beth_adv_query_result():
  mydb = msc.connect(
    host="104.197.38.184", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
  )

  mycursor = mydb.cursor()

  mycursor.execute("""SELECT a.actor_name, COUNT(DISTINCT m.media_id) as media_count
  FROM Actors a NATURAL JOIN Roles r NATURAL JOIN Media m
  WHERE m.director = "Martin Scorsese" AND actor_id IN (SELECT DISTINCT actor_id FROM Roles NATURAL JOIN Media WHERE country != "United States")
  GROUP BY actor_id
  ORDER BY media_count DESC
  LIMIT 15  
  """)

  myresult = mycursor.fetchall()

  mydb.commit()
  mydb.close()
  
  return {'result': myresult}

# /create_user_watch_list_entry?user_id=0&media_id=0&watched=true
@app.route('/create_user_watch_list_entry')
def create_user_watch_list_entry():
  user_id = request.args.get('user_id')
  media_id = request.args.get('media_id')
  watched = request.args.get('watched')

  mydb = msc.connect(
    host="104.197.38.184", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
  )

  mycursor = mydb.cursor()

  mycursor.execute("INSERT INTO UserWatchlistEntry VALUES ({}, {}, {})".format(user_id, media_id, watched))

  mycursor.execute("SELECT * FROM UserWatchlistEntry WHERE user_id = '{}' AND media_id = '{}'".format(user_id, media_id))
  myresult = mycursor.fetchall()

  mydb.commit()
  mydb.close()

  return {'result' : myresult}

# /look_up_show_name?keywork=abcd
@app.route('/look_up_show_name')
def look_up_show_name():
  keyword = request.args.get('keyword')

  mydb = msc.connect(
    host="104.197.38.184", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
  )

  mycursor = mydb.cursor()

  mycursor.execute("SELECT MediaTitle FROM UserWatchlistEntry NATURAL JOIN Media WHERE MediaTitle LIKE '%{}%'".format(keyword))

  myresult = mycursor.fetchall()

  mydb.commit()
  mydb.close()
  
  return {'result': myresult}

# /update_user_watch_list_entry?user_id=0&media_id=0&watched=true
@app.route('/update_user_watch_list_entry')
def update_user_watch_list_entry():
  user_id = request.args.get('user_id')
  media_id = request.args.get('media_id')
  watched = request.args.get('watched')

  mydb = msc.connect(
    host="104.197.38.184", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
  )

  mycursor = mydb.cursor()

  mycursor.execute("UPDATE UserWatchlistEntry SET watched = {} WHERE user_id = {} AND media_id = {}".format(watched, user_id, media_id))

  mycursor.execute("SELECT * FROM UserWatchlistEntry WHERE user_id = '{}' AND media_id = '{}'".format(user_id, media_id))
  myresult = mycursor.fetchall()

  mydb.commit()
  mydb.close()

  return {'result': myresult}

# /delete_user_watch_list_entry?user_id=0&media_id=0
@app.route('/delete_user_watch_list_entry')
def delete_user_watch_list_entry():
  user_id = request.args.get('user_id')
  media_id = request.args.get('media_id')

  mydb = msc.connect(
    host="104.197.38.184", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
  )

  mycursor = mydb.cursor()

  mycursor.execute("DELETE FROM UserWatchlistEntry WHERE WHERE user_id = {} AND media_id = {}".format(user_id, media_id))

  mydb.commit()
  mydb.close()