import mysql.connector as msc

# Connect to the database
mydb = msc.connect(
    host="104.197.222.175", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
)

mycursor = mydb.cursor()

mycursor.execute("DROP TABLE IF EXISTS Actors")
mycursor.execute("DROP TABLE IF EXISTS GenreTags")
mycursor.execute("DROP TABLE IF EXISTS Media")
mycursor.execute("DROP TABLE IF EXISTS User")
mycursor.execute("DROP TABLE IF EXISTS UserWatchlistEntry")
mycursor.execute("DROP TABLE IF EXISTS QuizAnswerChoice")
mycursor.execute("DROP TABLE IF EXISTS QuizQuestion")

# Create the original tables

mycursor.execute(""" 
CREATE TABLE Actors (
    actor_id INT NOT NULL,
    actor_name VARCHAR(50),
    starred_in INT,
    PRIMARY KEY(actor_id)
)
""")

mycursor.execute(""" 
CREATE TABLE GenreTags (
    genre_name VARCHAR(50),
    media_id INT
)
""")

mycursor.execute(""" 
CREATE TABLE Media (
    media_id INT NOT NULL,
    media_type VARCHAR(50),
    media_title VARCHAR(100),
    director VARCHAR(50),
    country VARCHAR(50),
    date_added VARCHAR(50),
    release_year INT,
    age_rating VARCHAR(50),
    duration VARCHAR(50),
    description VARCHAR(50),
    PRIMARY KEY(media_id)
)
""")

mycursor.execute(""" 
CREATE TABLE User (
    user_id INT NOT NULL,
    username VARCHAR(50),
    PRIMARY KEY (user_id)
)
""")

mycursor.execute(""" 
CREATE TABLE UserWatchlistEntry (
    user_id INT,
    media_id INT,
    watched BOOLEAN
)
""")

mycursor.execute(""" 
CREATE TABLE QuizAnswerChoice (
    answer_choice_id INT NOT NULL,
    question_id INT,
    description VARCHAR(50),
    image_url VARCHAR(500),
    result_meaning VARCHAR(50),
    PRIMARY KEY (answer_choice_id)
)
""")

mycursor.execute(""" 
CREATE TABLE QuizQuestion (
    question_id INT NOT NULL,
    description VARCHAR(100),
    category_controlling VARCHAR(50),
    PRIMARY KEY (question_id)
)
""")

# Add foreign keys

mycursor.execute("ALTER TABLE Actors ADD FOREIGN KEY (starred_in) REFERENCES Media(media_id)")
mycursor.execute("ALTER TABLE GenreTags ADD FOREIGN KEY (media_id) REFERENCES Media(media_id)")
mycursor.execute("ALTER TABLE UserWatchlistEntry ADD FOREIGN KEY (user_id) REFERENCES User(user_id)")
mycursor.execute("ALTER TABLE UserWatchlistEntry ADD FOREIGN KEY (media_id) REFERENCES Media(media_id)")
mycursor.execute("ALTER TABLE QuizAnswerChoice ADD FOREIGN KEY (question_id) REFERENCES QuizQuestion(question_id)")

mycursor.execute("SHOW TABLES")

myresult = mycursor.fetchall()

for x in myresult:
  print(x)