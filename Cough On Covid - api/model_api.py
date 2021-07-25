#!/home/siewe/anaconda3/bin/python

import re
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import os
import numpy as np
from tensorflow.keras.models import load_model
from utils import Sound
from sklearn.preprocessing import MinMaxScaler
import librosa
import matplotlib.pyplot as plt
import pickle

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
UPLOAD_FOLDER = "sounds/"
model = ""

### Prediction with Tensorflow model
def make_prediction(fullname):
    sound = Sound(fullname)
    #os.system("rm -f sounds/*")
    X = sound.mfcc().reshape((1,-1))
    scaler = pickle.load(open('scaler.pickle', 'rb'))
    X = scaler.transform(X)
    result = model.predict(X)[0][0]*100
    librosa.display.waveplot(sound.data, sound.sr)
    print(sound.data.shape)
    return str(round(result,1))


### Prediction with sklearn's SVC model
#def make_prediction(fullname):
#   image = kerasimage.load_img(fullname, target_size=input_shape)
#    os.system("rm -f images/*")
#    np.expand_dims(image, axis=0)
#    image = kerasimage.img_to_array(image).flatten()/255
#    result = model.predict([image])[0]
#    return result

@app.before_first_request
def load__model():
    print("[INFO] Model Loading...")
    global model
    model = load_model("coughOnCovid.h5")
    #model = joblib.load("api/adidas_puma_nike.joblib")
    print("[INFO] : Model loaded")



@app.route('/', methods=['GET'])
@cross_origin()
def bonjour():
    return "google\n"

@app.route('/', methods=['POST'])
@cross_origin()
def bonjourpost():
    data = request.data
    print(data)
    return "google"


@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    print("google")
    audiofile = request.files['file']
    fullname = os.path.join(UPLOAD_FOLDER, audiofile.filename)
    audiofile.save(fullname)
    result = make_prediction(fullname)
    return result


if __name__ == "__main__":
    port=int(os.environ.get("PORT",9100))
    app.run(host="0.0.0.0", port=port, debug=True)
