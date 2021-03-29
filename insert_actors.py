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

media_id = 0
actor_id = 0

actor_ids = {} # a dict that holds actors -> ids

for row in data.itertuples():
    actors_str = str(row.cast).split(", ")
    for name in actors_str:
        # if the actor doesn't have a registered ID, give them one
        if name not in actor_ids:
            actor_ids[name] = actor_id
            formatted_name = str(name).replace("'", "''")
            mycursor.execute(f"INSERT INTO Actors VALUES ({actor_ids[name]}, '{formatted_name}', {0})")
            actor_id += 1
        
        cur_actor_id = actor_ids[name]

        sql_command = f'''INSERT INTO Roles VALUES (
            {cur_actor_id},
            {media_id}
        )'''

        mycursor.execute(sql_command)

    print(media_id)
    media_id += 1

mycursor.execute("SELECT COUNT(*) FROM Actors")

myresult = mycursor.fetchall()
for x in myresult:
  print(x)

mydb.commit()
mydb.close()