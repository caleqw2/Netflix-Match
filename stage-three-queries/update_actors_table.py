import mysql.connector as msc

mydb = msc.connect(
    host="104.197.222.175", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
)

mycursor = mydb.cursor()

# mycursor.execute("SHOW TABLES")

# mycursor.execute('''CREATE TABLE Roles (
#     actor_id INT,
#     media_id INT
# )''')

mycursor.execute("""SELECT m.media_title FROM Media m NATURAL JOIN Roles r NATURAL JOIN Actors a WHERE a.actor_name = \"Taylor Swift\"""")

# mycursor.execute("ALTER TABLE Roles ADD FOREIGN KEY (actor_id) REFERENCES Actors(actor_id)")
# mycursor.execute("ALTER TABLE Roles ADD FOREIGN KEY (media_id) REFERENCES Media(media_id)")

myresult = mycursor.fetchall()
for x in myresult:
  print(x)

mydb.commit()
mydb.close()