# Joins, set operations, aggregation, subqueries

# Beth: actors who have been in movies with director Martin Scorsese and number of movies they've been in, in order by how many movies they've been in (join and group by)
# Shagun: Actors that have starred in at least 3 roles in Chinese movies (join and subquery)
# Cale: for eeach genre, find number of R rated movies (join, group by)

# Shagun
# SELECT actor_name
# FROM Actors JOIN Roles on actor_id JOIN Media on media_id JOIN
#   (SELECT COUNT(media_id) as num_roles FROM Roles)
# WHERE country = "China" AND num_roles >= 3

# Beth
# SELECT actor_name, COUNT(DISTINCT media_id) as media_count
# FROM Actors JOIN Roles on actor_id JOIN Media on media_id 
# WHERE director = "Martin Scorsese"
# GROUP BY actor_id
# ORDER BY media_count ASC

# Cale
# SELECT genre_name, COUNT(DISTINCT media_id)
# FROM GenreTags g NATURAL JOIN Media m
# WHERE m.rating = "R"
# GROUP BY genre_name

# mycursor.execute("""SELECT m.media_title FROM Media m NATURAL JOIN Roles r NATURAL JOIN Actors a WHERE a.actor_name = \"Taylor Swift\"""")


#Alice