import mysql.connector as msc
from flask import Flask
from flask_cors import CORS
from flask import request

#test

app = Flask(__name__)
CORS(app)


def execute_query(query):
  mydb = msc.connect(
    host="104.197.38.184", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
  )

  if not mydb.is_connected():
    return "MySQL instance is not connected!"

  mycursor = mydb.cursor()
  mycursor.execute(query)
  myresult = mycursor.fetchall()
  mydb.commit()
  mydb.close()

  return myresult


#my advanced query
@app.route('/alice_query')
def alice_query():
  mydb = msc.connect(
  host="104.197.38.184", # This is the IP of the GCP instance
  user="root",
  password="12345",
  database="netflix_match"
  )
  mycursor = mydb.cursor()
  mycursor.execute("""
  SELECT a.actor_name, COUNT(DISTINCT m.media_id)
  FROM Actors a NATURAL JOIN Roles r NATURAL JOIN Media m NATURAL JOIN GenreTags g
  WHERE g.genre_name = "Romantic Movies"
  GROUP BY actor_id
  UNION
  SELECT a.actor_name, COUNT(DISTINCT m.media_id)
  FROM Actors a NATURAL JOIN Roles r NATURAL JOIN Media m
  WHERE m.country = "Australia" 
  GROUP BY actor_id
  ORDER BY actor_name
  """)
  myresult = mycursor.fetchall()
  mydb.commit()
  mydb.close()

  if result == '':
    result = "There are no actors that fit that criteria"
  return {'result': result}

#create new media entry
@app.route('/create_media/<media_type>/<media_title>')
def create_media(media_type, media_title):
  #check to see if media_id with this id exists already
  current_media = execute_query("SELECT * FROM Media WHERE media_title = {media_title}")
  if not current_media:
    new_id = execute_query("SELECT COUNT(*) FROM Media ORDER BY media_id DESC")[0][0] + 1
    execute_query("INSERT INTO Media (media_id, media_type, media_title, director, country, date_added, release_year, age_rating, duration, description) VALUES ({}, {}}, {}, {}, {}, {}, {}, {}, {}, {})").format(new_id, media_type, media_title, "", "", "", "", "", "", "")
    result = f'Inserted "{media_title}"" into Media table along with other attributes.'

  else:
    result = f'Media "{media_title}"" already exists in Media table.'
  return {'result': result}

#update media entry
@app.route('/update_media/<media_title>/<new_title>')
def update_media(media_title, new_title):
  #see if media_title exists
  current_media = execute_query("SELECT * FROM Media WHERE media_title = {media_title}")
  if not current_media:
    return {'result': "Media title doesn't exist"}

  else:
    execute_query("UPDATE Media SET media_title = {} WHERE media_title = {}").format(media_title, new_title)
    return {'result': 'Media title changed from "{media_title}" to "{new_title}"'}

#lookup all media with that word in title
@app.route('/lookup_media/<media_title>')
def lookup_media(media_title):
  media_fitting = execute_query("SELECT media_title FROM Media WHERE media_title LIKE "%{}%"").format(media_title)

  if not media_fitting:
    return {'result':"No media matching that word"}
  else:
    return {'result': media_fitting}

#delete media based on title
@app.route('/delete_media/<media_title>')
def delete_media(media_title):
  execute_query("DELETE FROM Media WHERE media_title = {}").format(media_title)
  
  return {'result':'Deleted "{media_title}" from Media table'}