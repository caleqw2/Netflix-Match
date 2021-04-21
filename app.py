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

  mycursor.execute(""" SELECT a.actor_name, a.actor_id, genre_name
 FROM Actors a NATURAL JOIN Roles NATURAL JOIN GenreTags NATURAL JOIN Media
 WHERE (country = "China" AND genre_name = "Comedies") 
 GROUP BY actor_id
 ORDER BY a.actor_name ASC
 LIMIT 15 
  """)

  myresult = mycursor.fetchall()

  mydb.commit()
  mydb.close()
  
  result_str = ""
  for row in myresult:
    result_str += row[0] + " has id " + str(row[1]) + "; "
  
  return {'result': result_str}

#creating 
# /create_user_watch_list_entry?user_id=0&media_id=0&watched=true
@app.route('/create_user_watch_list_entry')
def create_user_watch_list_entry():
  # mycursor.execute("INSERT INTO QuizQuestion(question_id, description) VALUES ({}, {})".format(user_id, media_id))
  # user_id = get_user_id(request.args.get('user_name'))
  # media_id = get_media_id(request.args.get('media_name'))
  # watched = request.args.get('watched')

  # if user_id == "Does not exist":
  #   return {'result': "User doesn't exist"}

  # if media_id == "Does not exist":
  #   return {'result': "Media doesn't exist"}
  user_id, media_id = get_user_info(request.args.get('user_name'), request.args.get('media_name'))


  mydb = msc.connect(
    host="104.197.38.184", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
  )

  mycursor = mydb.cursor()


  mycursor.execute("SELECT question_id, description FROM QuizQuestion WHERE question_id = '{}' AND description = '{}'".format(user_id, media_id))
  myresult = mycursor.fetchall()

  mydb.commit()
  mydb.close()

  # watched_str = "false"
  # if (myresult[0][2]):
  #   watched_str = "true"

  result_str = "Question ID: " + str(myresult[0][0]) + " Description: " + myresult[0][1] 
  return {'result': result_str}


#search
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

  mycursor.execute("SELECT question_id FROM QuizQuestion WHERE question_id LIKE '%{}%'".format(keyword))

  myresult = mycursor.fetchall()

  mydb.commit()
  mydb.close()

  result_str = ""
  for row in myresult:
    result_str += str(row[0]) + "; "
  
  return {'result': result_str}

#updating section
# /update_user_watch_list_entry?user_name=0&media_name=0&watched=true
@app.route('/update_user_watch_list_entry')
def update_user_watch_list_entry():
  # user_id = get_user_id(request.args.get('user_name'))
  # media_id = get_media_id(request.args.get('media_name'))
  # watched = request.args.get('watched')

  # if user_id == "Does not exist":
  #   return {'result': "User doesn't exist"}

  # if media_id == "Does not exist":
  #   return {'result': "Media doesn't exist"}
  user_id, media_id = get_user_info(request.args.get('user_name'), request.args.get('media_name'))

  mydb = msc.connect(
    host="104.197.38.184", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
  )

  mycursor = mydb.cursor()
  print("UPDATE QuizQuestion SET description = '{}' WHERE QuizQuestion.question_id = {}".format( media_id, user_id))
  mycursor.execute("UPDATE QuizQuestion SET description = '{}' WHERE QuizQuestion.question_id = {}".format(media_id, user_id))
  
  #mycursor.execute("SELECT question_id, media_title, watched FROM UserWatchlistEntry NATURAL JOIN User Natural JOIN Media WHERE user_id = '{}' AND media_id = '{}'".format(user_id, media_id))
  #myresult = mycursor.fetchall()

  mydb.commit()
  mydb.close()

  result_str = "Question ID: " + user_id + ", Description: " + media_id
  
  return {'result': result_str}

# deleting 
# /delete_user_watch_list_entry?user_id=0&media_id=0
@app.route('/delete_user_watch_list_entry')
def delete_user_watch_list_entry():
  # user_id = get_user_id(request.args.get('user_name'))
  # media_id = get_media_id(request.args.get('media_name'))

  # if user_id == "Does not exist":
  #   return {'result': "User doesn't exist"}

  # if media_id == "Does not exist":
  #   return {'result': "Media doesn't exist"}
  user_id, media_id = get_user_info(request.args.get('user_name'), request.args.get('media_name'))

  mydb = msc.connect(
    host="104.197.38.184", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
  )

  mycursor = mydb.cursor()

  mycursor.execute("DELETE FROM QuizQuestion WHERE question_id = {} AND description = '{}'".format(user_id, media_id))

  mydb.commit()
  mydb.close()

  user_name = request.args.get('user_name')
  media_name = request.args.get('media_name').replace("%20", " ")
  return {'result': "Deleted {} (with description) {}) from the Quiz Questions".format(media_name, user_name)}

# def get_media_id(media_name):
#   mydb = msc.connect(
#     host="104.197.38.184", # This is the IP of the GCP instance
#     user="root",
#     password="12345",
#     database="netflix_match"
#   )

#   media_name.replace("%20", " ")

#   mycursor = mydb.cursor()

#   mycursor.execute("SELECT description FROM QuizQuestion WHERE description = '{}'".format(media_name))

#   myresult = mycursor.fetchall()
#   if not myresult:
#     return "Does not exist"

#   mydb.commit()
#   mydb.close()

#   return myresult[0][0]

def get_user_info(user_name, media_name):
  mydb = msc.connect(
    host="104.197.38.184", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
  )

  mycursor = mydb.cursor()

  #mycursor.execute("SELECT question_id FROM QuizQuestion WHERE question_id = '{}'".format(user_name))
  mycursor.execute("INSERT IGNORE INTO QuizQuestion(question_id, description) VALUES ({}, '{}')".format(user_name, media_name))


  mydb.commit()
  mydb.close()

  return user_name, media_name