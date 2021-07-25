import librosa
import librosa.display
import IPython.display as ipd
import numpy as np
from numpy.core.numeric import full
import pandas as pd
from pydub import AudioSegment
import json
from IPython.core.display import display


class Sound:

    df = pd.DataFrame({"uuid": []})
    ds_path = ""

    def __init__(self, name):
        try:
            df = self.__class__.df
            self.name = name
            self.category = df[df["uuid"] == self.name.split(".")[0]].status.values[0] if len(df[df["uuid"] == self.name.split(".")[0]]) != 0 else "unknown"
            
            if self.category == "healthy" or self.category == 1:
                self.path = Sound.ds_path+f"/healthy/{name}"
            
            elif self.category == "covid" or self.category == 0: 
                self.path = Sound.ds_path+f"/covid/{name}"
            
            else:
                self.path = name
                
            print(self.path)
                
            self.data, self.sr = librosa.load(self.path)
        except:
            print("You must specify a file name")

    # set the dataframe to manipulate
    def set_df(ds_path="", df=pd.DataFrame({})):
        Sound.ds_path = ds_path
        Sound.df = df if len(df) != 0 else pd.read_csv(df_path)[["uuid", "status"]]

    # sample the sound by specifying a sample rate
    def sample(self, sr=22050):
        self.data = librosa.load(self.path, sr)

    # read the audio sound
    def read(self, autoplay=True):
        self.data, self.sr = librosa.load(self.path)
        display(ipd.Audio(self.path, autoplay=autoplay))

    # get the sound mfcc(s)
    def mfcc(self, n_mfcc=40):
        # feature extraction with MFCC ( Mel-Frequency Cepstral Coefficients)
        mfccs = librosa.feature.mfcc(y=self.data, n_mfcc=n_mfcc)
        mfccs_ = np.mean(mfccs.T, axis=0)
        return mfccs_

    # convert the sound file to another format and the new file to the destination path
    def convert(self, format, destination="./"):
        actual_format = self.name.split(".")[-1]
        without_ext = self.name.split(".")[0]
        print(self.path)
        song = AudioSegment.from_file(self.path, actual_format)
        song.export(f"{destination}{without_ext}.{format}", format=format, bitrate="320k")
        #print("Converted and saved")
    
    # get index of biased sounds in the dataframe and store them in a file
    def filter_sounds(savefile="saves.json",  format="webm"):
        saves = {}
        start_line = 0
        with open(savefile, "r") as f:
            saves = json.load(f)
            start_line = saves["last_line"] + 1

        df = Sound.df[start_line:]
        i = 0
        while True:
            print(f"\n{len(saves['indexes'])}/{start_line+1+i} checked")
            line = df[i:i + 1]
            index = line.index.values[0]
            
            try:
                name = f"{line.uuid.values[0]}.webm"
                filepath = f"{Sound.ds_path}/{name}"
                s = Sound(name)
                s.read()
                rep = input("voulez-vous sauvegarder le fichier ? (y|n) ")
                if rep.lower() == "y":
                    print(f"{index} added")
                    with open(savefile, "w") as f:
                        saves["last_line"] = int(start_line+i)
                        saves["indexes"].append(int(index))
                        json.dump(saves, f)
                
            except:
                print(f"This file ({filepath}) doesn't exist")
            i += 1

    def reinit_saves(file="saves.json"):
        with open(file, "w") as f:
            obj = {"last_line": -1, "indexes": []}
            json.dump(obj, f)

