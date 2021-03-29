import mysql.connector as msc

# Connect to the database
mydb = msc.connect(
    host="104.197.222.175",
    user="root",
    password="12345",
    database="netflix_match"
)

mycursor = mydb.cursor()

# INSERT QUERY HERE
# mycursor.execute("""
#  SELECT a.actor_name, g.genre_name, m.media_id
#  FROM Actors a NATURAL JOIN Roles r NATURAL JOIN Media m NATURAL JOIN GenreTags g
#  WHERE g.genre_name = "Romantic Movies"
# """)

mycursor.execute("""
 SELECT actor_name, num_roles, a.actor_id
 FROM Actors a NATURAL JOIN Roles NATURAL JOIN Media JOIN
   (SELECT COUNT(media_id) as num_roles, r.actor_id FROM Roles r GROUP BY r.actor_id) AS temp
 WHERE country = "China" AND num_roles >= 3
 LIMIT 20

""")

# Gather results
myresult = mycursor.fetchall()
for x in myresult:
  print(x)