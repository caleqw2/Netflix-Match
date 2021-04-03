import mysql.connector as msc

# Connect to the database
mydb = msc.connect(
    host="104.197.38.184",
    user="root",
    password="12345",
    database="netflix_match"
)

mycursor = mydb.cursor()

# # INSERT QUERY HERE
# mycursor.execute("""
# SELECT a.actor_name, COUNT(DISTINCT m.media_id)
# FROM Actors a NATURAL JOIN Roles r NATURAL JOIN Media m NATURAL JOIN GenreTags g
# WHERE g.genre_name = "Romantic Movies"
# GROUP BY actor_id
# UNION
# SELECT a.actor_name, COUNT(DISTINCT m.media_id)
# FROM Actors a NATURAL JOIN Roles r NATURAL JOIN Media m
# WHERE m.country = "Australia" 
# GROUP BY actor_id
# ORDER BY actor_name
# """)

# mycursor.execute("""
#  SELECT actor_name, num_roles, a.actor_id
#  FROM Actors a NATURAL JOIN Roles NATURAL JOIN Media JOIN
#    (SELECT COUNT(media_id) as num_roles, r.actor_id FROM Roles r GROUP BY r.actor_id) AS temp
#  WHERE country = "China"  
#  HAVING num_roles >= 3
#  LIMIT 20
# """)

# mycursor.execute("""
#  SELECT a.actor_name, a.actor_id, genre_name
#  FROM Actors a NATURAL JOIN Roles NATURAL JOIN GenreTags NATURAL JOIN Media
#  WHERE (country = "China" AND genre_name = "Comedies") 
#  GROUP BY actor_id
#  ORDER BY a.actor_name ASC
#  LIMIT 20
 

# """)

mycursor.execute("""
 SELECT a.actor_name, a.actor_id, genre_name
 FROM Actors a NATURAL JOIN Roles NATURAL JOIN GenreTags NATURAL JOIN Media
 WHERE (country = "China" AND genre_name = "Comedies") 
 GROUP BY actor_id
 ORDER BY a.actor_name ASC
 LIMIT 20
""")
#    (SELECT COUNT(media_id) as num_roles, r.actor_id FROM Roles r GROUP BY r.actor_id) AS temp


# mycursor.execute("""
#  SELECT actor_name, a.actor_id
#  FROM Actors a NATURAL JOIN Roles NATURAL JOIN Media JOIN
   
#  WHERE country = "China" AND actor_id IN (SELECT r.actor_id 
#    FROM Roles r 
#    WHERE COUNT(media_id) >= 3 
#    GROUP BY r.actor_id) AS temp

#  LIMIT 20

# """)



# Gather results
myresult = mycursor.fetchall()
for x in myresult:
  print(x)