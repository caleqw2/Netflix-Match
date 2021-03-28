import pandas as pd
import mysql.connector as msc

data = pd.read_csv("netflix_titles.csv")

print(data.head())

mydb = msc.connect(
    host="104.197.222.175", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
)

mycursor = mydb.cursor()

# media_id = 0

# for row in data.itertuples():
#   sql_command = f'''INSERT IGNORE INTO Media VALUES (
#       {media_id},
#       '{str(row.type).replace("'", "''")}',
#       '{str(row.title).replace("'", "''")}',
#       '{str(row.director).replace("'", "''")}',
#       '{str(row.country).replace("'", "''")}',
#       '{str(row.date_added).replace("'", "''")}',
#       {row.release_year},
#       '{str(row.rating).replace("'", "''")}',
#       '{str(row.duration).replace("'", "''")}',
#       '{str(row.description).replace("'", "''")}'
#       )'''
#   mycursor.execute(sql_command)
#   media_id += 1
#   print(media_id)

mycursor.execute("SELECT * FROM Media WHERE country = \"Japan\"")

myresult = mycursor.fetchall()

for x in myresult:
  print(x)

mydb.commit()
mydb.close()
