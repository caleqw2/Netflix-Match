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
  
  result_str = ""
  for row in myresult:
    result_str += row[0] + " has been in " + str(row[1]) + "; "
  
  return {'result': result_str}

# /create_user_watch_list_entry?user_id=0&media_id=0&watched=true
@app.route('/create_user_watch_list_entry')
def create_user_watch_list_entry():
  user_id = get_user_id(request.args.get('user_name'))
  media_id = get_media_id(request.args.get('media_name'))
  watched = request.args.get('watched')

  if user_id == "Does not exist":
    return {'result': "User doesn't exist"}

  if media_id == "Does not exist":
    return {'result': "Media doesn't exist"}

  mydb = msc.connect(
    host="104.197.38.184", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
  )

  mycursor = mydb.cursor()

  mycursor.execute("INSERT INTO UserWatchlistEntry (user_id, media_id, watched) VALUES ({}, {}, {})".format(user_id, media_id, watched))

  mycursor.execute("SELECT username, media_title, watched FROM UserWatchlistEntry NATURAL JOIN User Natural JOIN Media WHERE user_id = '{}' AND media_id = '{}'".format(user_id, media_id))
  myresult = mycursor.fetchall()

  mydb.commit()
  mydb.close()

  watched_str = "false"
  if (myresult[0][2]):
    watched_str = "true"

  result_str = "Username=" + myresult[0][0] + " Media Title=" + myresult[0][1] + " Watched=" + watched_str
  return {'result': result_str}

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

  mycursor.execute("SELECT media_title FROM Media WHERE media_title LIKE '%{}%'".format(keyword))

  myresult = mycursor.fetchall()

  mydb.commit()
  mydb.close()

  result_str = ""
  for row in myresult:
    result_str += row[0] + "; "
  
  return {'result': result_str}

# /update_user_watch_list_entry?user_name=0&media_name=0&watched=true
@app.route('/update_user_watch_list_entry')
def update_user_watch_list_entry():
  user_id = get_user_id(request.args.get('user_name'))
  media_id = get_media_id(request.args.get('media_name'))
  watched = request.args.get('watched')

  if user_id == "Does not exist":
    return {'result': "User doesn't exist"}

  if media_id == "Does not exist":
    return {'result': "Media doesn't exist"}

  mydb = msc.connect(
    host="104.197.38.184", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
  )

  mycursor = mydb.cursor()

  mycursor.execute("UPDATE UserWatchlistEntry SET watched = {} WHERE user_id = {} AND media_id = {}".format(watched, user_id, media_id))

  mycursor.execute("SELECT username, media_title, watched FROM UserWatchlistEntry NATURAL JOIN User Natural JOIN Media WHERE user_id = '{}' AND media_id = '{}'".format(user_id, media_id))
  myresult = mycursor.fetchall()

  mydb.commit()
  mydb.close()

  watched_str = "false"
  if (myresult[0][2]):
    watched_str = "true"

  result_str = "Username=" + myresult[0][0] + " Media Title=" + myresult[0][1] + " Watched=" + watched_str
  return {'result': result_str}

# /delete_user_watch_list_entry?user_id=0&media_id=0
@app.route('/delete_user_watch_list_entry')
def delete_user_watch_list_entry():
  user_id = get_user_id(request.args.get('user_name'))
  media_id = get_media_id(request.args.get('media_name'))

  if user_id == "Does not exist":
    return {'result': "User doesn't exist"}

  if media_id == "Does not exist":
    return {'result': "Media doesn't exist"}

  mydb = msc.connect(
    host="104.197.38.184", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
  )

  mycursor = mydb.cursor()

  mycursor.execute("DELETE FROM UserWatchlistEntry WHERE user_id = {} AND media_id = {}".format(user_id, media_id))

  mydb.commit()
  mydb.close()

  user_name = request.args.get('user_name')
  media_name = request.args.get('media_name').replace("%20", " ")
  return {'result': "Deleted {} from {}'s watchlist".format(media_name, user_name)}

def get_media_id(media_name):
  mydb = msc.connect(
    host="104.197.38.184", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
  )

  media_name.replace("%20", " ")

  mycursor = mydb.cursor()

  mycursor.execute("SELECT media_id FROM Media WHERE media_title = '{}'".format(media_name))

  myresult = mycursor.fetchall()
  if not myresult:
    return "Does not exist"

  mydb.commit()
  mydb.close()

  return myresult[0][0]

def get_user_id(user_name):
  mydb = msc.connect(
    host="104.197.38.184", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
  )

  mycursor = mydb.cursor()

  mycursor.execute("SELECT user_id FROM User WHERE username = '{}'".format(user_name))

  myresult = mycursor.fetchall()
  if not myresult:
    return "Does not exist"

  mydb.commit()
  mydb.close()

  return myresult[0][0]