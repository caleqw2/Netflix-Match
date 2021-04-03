# test hi
#testing a push
# another test after branch making 
# Joins, set operations, aggregation, subqueries

# Beth: actors who have been in movies with director Martin Scorsese and number of movies they've been in, in order by how many movies they've been in (join and group by)
# Shagun: Actors that have acted in Chinese Comedies (join and subquery)
# Cale: for each genre, find number of R rated movies (join, group by)


# Shagun
#  SELECT a.actor_name, a.actor_id, genre_name
#  FROM Actors a NATURAL JOIN Roles NATURAL JOIN GenreTags NATURAL JOIN Media
#  WHERE (country = "China" AND genre_name = "Comedies") 
#  GROUP BY actor_id
#  ORDER BY a.actor_name ASC
#  LIMIT 20

#(this one doesn't work but keep it here)
# SELECT actor_name
# FROM Actors JOIN Roles on actor_id JOIN Media on media_id JOIN
#   (SELECT COUNT(media_id) as num_roles FROM Roles)
# WHERE country = "China" AND num_roles >= 3



# Beth
# SELECT a.actor_name, COUNT(DISTINCT m.media_id) as media_count
# FROM Actors a NATURAL JOIN Roles r NATURAL JOIN Media m
# WHERE m.director = "Martin Scorsese"
# GROUP BY actor_id
# ORDER BY media_count DESC

# Cale (Gets the top 15 genre names with the most R-rated media)
# Uses joins and aggregations
# SELECT g.genre_name, COUNT(DISTINCT m.media_id) AS r_rating_count
# FROM GenreTags g NATURAL JOIN Media m
# WHERE age_rating = "R"
# GROUP BY g.genre_name
# ORDER BY r_rating_count DESC
# LIMIT 15

# mycursor.execute("""SELECT m.media_title FROM Media m NATURAL JOIN Roles r NATURAL JOIN Actors a WHERE a.actor_name = \"Taylor Swift\"""")


# Alice
# SUBQUERY
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

# SELECT A.actor_name
# FROM Actors A
# WHERE A.actor_name NOT IN (# SELECT a.actor_name, g.genre_name, m.media_id
# FROM Actors a NATURAL JOIN Roles r NATURAL JOIN Media m NATURAL JOIN GenreTags g
# WHERE g.genre_name = "Romantic Movies") AND ()