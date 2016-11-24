from flask import Flask, render_template, request, redirect, make_response, Response, json, url_for
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'media')

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route("/")
def home():
    return render_template('index.html')


@app.route("/video/<username>", methods=['GET', 'POST'])
def video(username='gomes'):
    if request.method == 'POST':
        video = request.files.get('data', None)
        if video:
            video.save(os.path.join(app.config.get('UPLOAD_FOLDER'), "{}.mp4".format(username)))
    response = make_response(json.dumps({"response": "Success!", "redirect": url_for('home'), }))
    return response


if __name__ == "__main__":
    app.run()
