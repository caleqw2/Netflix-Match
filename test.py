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
mycursor.execute("""

""")

# Gather results
myresult = mycursor.fetchall()
for x in myresult:
  print(x)