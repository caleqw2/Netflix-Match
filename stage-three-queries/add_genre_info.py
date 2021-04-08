import pandas as pd
import mysql.connector as msc

mydb = msc.connect(
    host="104.197.222.175", # This is the IP of the GCP instance
    user="root",
    password="12345",
    database="netflix_match"
)

mycursor = mydb.cursor()

data = pd.read_csv("netflix_titles.csv")

# media_id = 0
# for row in data.itertuples():
#     genre_tags = str(row.listed_in).split(", ")
#     for genre in genre_tags:
#         formatted_genre_name = str(genre).replace("'", "''")
#         sql_command = f'''INSERT INTO GenreTags VALUES (
#             '{formatted_genre_name}',
#             {media_id}
#         )'''

#         mycursor.execute(sql_command)

#     print(media_id)
#     media_id += 1

# mycursor.execute("SELECT COUNT(*) FROM GenreTags")

mycursor.execute("SELECT g.genre_name FROM Media m NATURAL JOIN GenreTags g WHERE m.media_title = \"The Other Guys\"")

myresult = mycursor.fetchall()
for x in myresult:
  print(x)

mydb.commit()
mydb.close()