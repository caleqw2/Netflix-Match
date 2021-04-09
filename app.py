import mysql.connector as msc
from flask import Flask
from flask_cors import CORS

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

### API Endpoints ###

# Finds all actors matching a keyword
@app.route('/keyword_search/<keyword>')
def keyword_search(keyword):
  query = f"SELECT * FROM Actors WHERE actor_name LIKE '%{keyword}%'"
  query_result = execute_query(query)

  result = ''
  for actor in query_result:
    result += f"{actor[1]} ({actor[0]})\n"

  if result == '':
    result = 'No actors found.'

  print(result)
  return {'result': result}

# Finds all movies an actor was in
@app.route('/movie_search/<actor>')
def movie_search(actor):
  query = f"""
    SELECT DISTINCT media_title, media_id, release_year
    FROM Media NATURAL JOIN Roles NATURAL JOIN Actors
    WHERE actor_name = '{actor}' """
  
  query_result = execute_query(query)

  result = "none" if len(query_result) == 0 else ''
  for media in query_result:
    result += f"{media[0]} ({media[2]}) - ID: {media[1]}\n"

  return {'result': result}

# Inserts an actor into a movie and creates them if they don't exist.
# Does nothing if the media id doesn't exist.
@app.route('/insert_actor/<actor_name>/<media_id>')
def insert_actor(actor_name, media_id):
  # Checks if media id exists
  media_exists = execute_query(f'SELECT * FROM Media WHERE media_id = {media_id}')
  if not media_exists:
    return {'result': f"The media_id {media_id} does not exist!"}

  result = ''

  # Create actor if they don't exist
  actor_exists = execute_query(f'SELECT actor_id FROM Actors WHERE actor_name = "{actor_name}"')
  if not actor_exists:
    new_actor_id = execute_query('SELECT COUNT(*) FROM Actors')[0][0]
    execute_query(f'''INSERT IGNORE INTO Actors(actor_name, actor_id, starred_in) 
                      VALUES ("{actor_name}", {new_actor_id}, 0)''')
    result += f'Inserted new actor {actor_name}, {new_actor_id} into the Actors table.\n\n'

  # Adds the actor to Roles
  actor_id = execute_query(f'SELECT actor_id FROM Actors WHERE actor_name = "{actor_name}"')[0][0]
  media_name = execute_query(f'SELECT media_title FROM Media WHERE media_id = {media_id}')[0][0]
  execute_query(f'INSERT INTO Roles(actor_id, media_id) VALUES ({actor_id}, {media_id})')
  result += f'"{actor_name}" now stars in "{media_name}". Check it out!'

  return {'result': result}

# Updates an actor's name. Does nothing if the actor doesn't exist.
@app.route('/update_actor/<old_name>/<new_name>')
def update_actor(old_name, new_name):
  actor_exists = execute_query(f'SELECT * FROM Actors WHERE actor_name = "{old_name}"')
  if not actor_exists:
    return {'result': f'The actor "{old_name}" does not exist in the database.'}
  
  execute_query(f'UPDATE Actors SET actor_name = "{new_name}" WHERE actor_name = "{old_name}"')
  return {'result': f'Successfully changed the name of "{old_name}" to "{new_name}"'}

# Deletes an actor from the database
@app.route('/delete_actor/<actor_name>')
def delete_actor(actor_name):
  actor_id = execute_query(f'SELECT actor_id FROM Actors WHERE actor_name = "{actor_name}"')
  if not actor_id:
    return {'result': f'The actor "{actor_name}" does not exist in the database.'}

  # Get a list of all movies the deleted actor was in
  query = f"""
    SELECT DISTINCT media_title
    FROM Media NATURAL JOIN Roles NATURAL JOIN Actors
    WHERE actor_name = '{actor_name}' """
  media_list = execute_query(query)

  actor_id = actor_id[0][0]

  # Delete all the roles that actor starred in
  execute_query(f'DELETE FROM Roles WHERE actor_id = {actor_id}')
  # Delete the Actor entry
  execute_query(f'DELETE FROM Actors WHERE actor_id = {actor_id}')

  result = f'Deleted {actor_name} from {len(media_list)} shows/movies:\n\n'
  for media in media_list:
    result += f"{media[0]}\n"

  return {'result': result}

# Run the advanced query
@app.route('/advanced_query/<rating>')
def advanced_query(rating):
  query = f""" 
  SELECT g.genre_name, COUNT(DISTINCT m.media_id) AS r_rating_count
  FROM GenreTags g NATURAL JOIN Media m
  WHERE age_rating = "{rating}"
  GROUP BY g.genre_name
  ORDER BY r_rating_count DESC
  """

  query_result = execute_query(query)

  result = ''
  for row in query_result:
    result += f'{row[0]} - {row[1]}\n'
  
  if result == '':
    result = 'No movies found for that genre tag.'

  return {'result': result}
