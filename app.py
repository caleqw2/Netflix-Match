import mysql.connector as msc
from flask import Flask
from flask_cors import CORS

#test

app = Flask(__name__)
CORS(app)

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
  WHERE m.director = "Martin Scorsese"
  GROUP BY actor_id
  ORDER BY media_count DESC""")

  myresult = mycursor.fetchall()

  for x in myresult:
    print(x)

  mydb.commit()
  mydb.close()
  
  return {'result': myresult}
