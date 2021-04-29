import mysql.connector as msc
from flask import Flask
from flask_cors import CORS
from flask import request

app = Flask(__name__)
CORS(app)

# /create_user_watch_list_entry?user_id=0&media_id=0&watched=true


@app.route('/create_user_watch_list_entry')
def create_user_watch_list_entry():
    user_id = get_user_id(request.args.get('user_name'))
    media_id = get_media_id(request.args.get('media_name'))
    watched = request.args.get('watched')

    if user_id == "Does not exist":
        return {'result': "User doesn't exist"}

    if media_id == "Does not exist":
        return {'result': "Media doesn't exist"}

    mydb = msc.connect(
        host="104.197.38.184",  # This is the IP of the GCP instance
        user="root",
        password="12345",
        database="netflix_match"
    )

    mycursor = mydb.cursor()

    mycursor.execute("INSERT INTO UserWatchlistEntry (user_id, media_id, watched) VALUES ({}, {}, {})".format(
        user_id, media_id, watched))

    mycursor.execute("SELECT username, media_title, watched FROM UserWatchlistEntry NATURAL JOIN User Natural JOIN Media WHERE user_id = '{}' AND media_id = '{}'".format(user_id, media_id))
    myresult = mycursor.fetchall()

    mydb.commit()
    mydb.close()

    watched_str = "false"
    if (myresult[0][2]):
        watched_str = "true"

    result_str = "Username=" + \
        myresult[0][0] + " Media Title=" + \
        myresult[0][1] + " Watched=" + watched_str
    return {'result': result_str}

# /look_up_show_name?keywork=abcd


@app.route('/look_up_show_name')
def look_up_show_name():
    keyword = request.args.get('keyword')

    mydb = msc.connect(
        host="104.197.38.184",  # This is the IP of the GCP instance
        user="root",
        password="12345",
        database="netflix_match"
    )

    mycursor = mydb.cursor()

    mycursor.execute(
        "SELECT media_title FROM Media WHERE media_title LIKE '%{}%'".format(keyword))

    myresult = mycursor.fetchall()

    mydb.commit()
    mydb.close()

    result_str = ""
    for row in myresult:
        result_str += row[0] + "; "

    return {'result': result_str}

# /update_user_watch_list_entry?user_name=0&media_name=0&watched=true


@app.route('/update_user_watch_list_entry')
def update_user_watch_list_entry():
    user_id = get_user_id(request.args.get('user_name'))
    media_id = get_media_id(request.args.get('media_name'))
    watched = request.args.get('watched')

    if user_id == "Does not exist":
        return {'result': "User doesn't exist"}

    if media_id == "Does not exist":
        return {'result': "Media doesn't exist"}

    mydb = msc.connect(
        host="104.197.38.184",  # This is the IP of the GCP instance
        user="root",
        password="12345",
        database="netflix_match"
    )

    mycursor = mydb.cursor()

    mycursor.execute("UPDATE UserWatchlistEntry SET watched = {} WHERE user_id = {} AND media_id = {}".format(
        watched, user_id, media_id))

    mycursor.execute("SELECT username, media_title, watched FROM UserWatchlistEntry NATURAL JOIN User Natural JOIN Media WHERE user_id = '{}' AND media_id = '{}'".format(user_id, media_id))
    myresult = mycursor.fetchall()

    mydb.commit()
    mydb.close()

    watched_str = "false"
    if (myresult[0][2]):
        watched_str = "true"

    result_str = "Username=" + \
        myresult[0][0] + " Media Title=" + \
        myresult[0][1] + " Watched=" + watched_str
    return {'result': result_str}

# /delete_user_watch_list_entry?user_id=0&media_id=0


@app.route('/delete_user_watch_list_entry')
def delete_user_watch_list_entry():
    user_id = get_user_id(request.args.get('user_name'))
    media_id = get_media_id(request.args.get('media_name'))

    if user_id == "Does not exist":
        return {'result': "User doesn't exist"}

    if media_id == "Does not exist":
        return {'result': "Media doesn't exist"}

    mydb = msc.connect(
        host="104.197.38.184",  # This is the IP of the GCP instance
        user="root",
        password="12345",
        database="netflix_match"
    )

    mycursor = mydb.cursor()

    mycursor.execute(
        "DELETE FROM UserWatchlistEntry WHERE user_id = {} AND media_id = {}".format(user_id, media_id))

    mydb.commit()
    mydb.close()

    user_name = request.args.get('user_name')
    media_name = request.args.get('media_name').replace("%20", " ")
    return {'result': "Deleted {} from {}'s watchlist".format(media_name, user_name)}


def get_media_id(media_name):
    mydb = msc.connect(
        host="104.197.38.184",  # This is the IP of the GCP instance
        user="root",
        password="12345",
        database="netflix_match"
    )

    media_name.replace("%20", " ")

    mycursor = mydb.cursor()

    mycursor.execute(
        "SELECT media_id FROM Media WHERE media_title = '{}'".format(media_name))

    myresult = mycursor.fetchall()
    if not myresult:
        return "Does not exist"

    mydb.commit()
    mydb.close()

    return myresult[0][0]


def get_user_id(user_name):
    mydb = msc.connect(
        host="104.197.38.184",  # This is the IP of the GCP instance
        user="root",
        password="12345",
        database="netflix_match"
    )

    mycursor = mydb.cursor()

    mycursor.execute(
        "SELECT user_id FROM User WHERE username = '{}'".format(user_name))

    myresult = mycursor.fetchall()
    if not myresult:
        return "Does not exist"

    mydb.commit()
    mydb.close()

    return myresult[0][0]


@app.route('/display_watchlist')
def display_watchlist():
    mydb = msc.connect(
        host="104.197.38.184",  # This is the IP of the GCP instance
        user="root",
        password="12345",
        database="netflix_match"
    )

    mycursor = mydb.cursor()

    mycursor.execute("SELECT * FROM UserWatchlistEntry")

    myresult = mycursor.fetchall()
    if not myresult:
        return "Does not exist"

    mydb.commit()
    mydb.close()

    return myresult[0][0]


@app.route('/get_question_info/<questionNumber>')
def get_question_info(questionNumber):
    mydb = msc.connect(
        host="104.197.38.184",  # This is the IP of the GCP instance
        user="root",
        password="12345",
        database="netflix_match"
    )
    mycursor = mydb.cursor()

    results = {}


    mycursor.execute(f"SELECT description FROM QuizQuestion WHERE question_id = {questionNumber}")
    question_text = mycursor.fetchall()
    print(question_text)

    mycursor.execute(f"SELECT description, answer_choice_id FROM QuizAnswerChoice WHERE question_id = {questionNumber}")
    answer_choices = mycursor.fetchall()
    mydb.commit()
    mydb.close()

    results = {
      'questionText': question_text[0],
      'choiceOneText': answer_choices[0][0],
      'choiceTwoText': answer_choices[1][0],
      'choiceThreeText': answer_choices[2][0],
      'choiceOneID': answer_choices[0][1],
      'choiceTwoID': answer_choices[1][1],
      'choiceThreeID': answer_choices[2][1],
    }

    print("running query")
    return results

@app.route('/get_results/<results_array>')
def get_results(results_array):
    mydb = msc.connect(
        host="104.197.38.184",  # This is the IP of the GCP instance
        user="root",
        password="12345",
        database="netflix_match"
    )
    mycursor = mydb.cursor()

    mycursor.execute(f"CALL QuizResults ({results_array[0]}, {results_array[1]}, {results_array[2]}, {results_array[3]}, {results_array[4]}, {results_array[5]}, {results_array[6]})")
    # TODO: figure out how to randomize this
    mycursor.execute(f"SELECT media_title FROM finalResults LIMIT 10")
    
    media_results = mycursor.fetchall()

    myresult = ""
    for r in media_results:
        myresult += f"{r[0]}\n"

    return {'result': myresult}

@app.route('/create_or_get_user/<user_name>')
def create_or_get_user(user_name):
    mydb = msc.connect(
        host="104.197.38.184",  # This is the IP of the GCP instance
        user="root",
        password="12345",
        database="netflix_match"
    )
    mycursor = mydb.cursor()

    mycursor.execute(f"SELECT user_id FROM User WHERE username='{user_name}'")
    user_id = mycursor.fetchall()
    result = {}

    if len(user_id) == 0:
        mycursor.execute(f"SELECT MAX(user_id) FROM User")
        user_count = mycursor.fetchall()
        new_user_id = int(user_count[0][0]) + 1
        mycursor.execute(f"INSERT INTO User VALUES ({new_user_id}, '{user_name}')")
        result = {"user_id": new_user_id}

    else:
        result = {"user_id": user_id}

    mydb.commit()
    mydb.close()

    return result

@app.route('/get_watchlist/<user_id>')
def get_watchlist(user_id):
    mydb = msc.connect(
        host="104.197.38.184",  # This is the IP of the GCP instance
        user="root",
        password="12345",
        database="netflix_match"
    )
    mycursor = mydb.cursor()

    mycursor.execute(f"SELECT media_title, watched FROM UserWatchlistEntry NATURAL JOIN Media WHERE user_id={user_id}")

    result = mycursor.fetchall()
    myresult = ""
    for r in result:
        watched = "watched;" if r[1] else "not watched;"
        myresult += f"{r[0]} - {watched}\n"

    mydb.commit()
    mydb.close()

    return {'result': myresult}

@app.route('/delete_user/<user_id>')
def delete_user(user_id):
    mydb = msc.connect(
        host="104.197.38.184",  # This is the IP of the GCP instance
        user="root",
        password="12345",
        database="netflix_match"
    )
    mycursor = mydb.cursor()

    mycursor.execute(f"SELECT media_title, watched FROM UserWatchlistEntry NATURAL JOIN Media WHERE user_id={user_id}")
    result = mycursor.fetchall()

    mycursor.execute(f"DELETE FROM User WHERE user_id = {user_id}")

    mydb.commit()
    mydb.close()

    return {'result': result}
