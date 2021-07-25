import React from 'react'
import {
    Dimensions,
    StyleSheet,
    View, Text,
    Image, Button, PermissionsAndroid, TouchableOpacity
} from 'react-native'

import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import fs from "react-native-fs"
import AudioButton from "../Components/AudioButton";
import {
    Fontisto,
    FontAwesome,
    Ionicons,
    Foundation,
    FontAwesome5,
    Feather,
    MaterialIcons,
    MaterialCommunityIcons,
    EvilIcons
} from "@expo/vector-icons";
import i18n from "../i18n/i18n"
import api from "../services/service"
import FadeIn from "../Animations/FadeIn"
import HeaderIcon from "../Components/HeaderIcon";

console.disableYellowBox = true

class CoughTest extends React.Component {

    static navigationOptions = (props) => {
        return {
            headerLeft: () => (<TouchableOpacity style={{padding: 10}} activeOpacity={0.5} onPress={() => props.navigation.openDrawer()}>
                <EvilIcons name="navicon" size={30} color="black" />
            </TouchableOpacity>),
            headerRight: () => (<HeaderIcon icon={require('../../assets/images/virus.png')} action={() => {}}/>),
            headerTitle: 'Cough Test',
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            isLoggingIn: false,
            recordSecs: 0,
            recordTime: '00:00:00',
            currentPositionSec: 0,
            currentDurationSec: 0,
            playTime: '00:00:00',
            duration: '00:00:00',
            step: 0,
            percent: 72,
            filename: "",
        };
        this.audioRecorderPlayer = new AudioRecorderPlayer();
        this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
    }

    _onDone = () => {
        this.props.navigation.navigate('Home')
    }

    onStartRecord = async () => {
        let filename = Date.now()
        const path = fs.ExternalStorageDirectoryPath+`/Cough On Covid/Media/${filename}.wav`;
        const audioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
        };
        console.log('audioSet', audioSet);
        if(await this.checkAudioPermission()){
            const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
            this.audioRecorderPlayer.addRecordBackListener((e) => {
                this.setState({
                    recordSecs: e.current_position,
                    recordTime: this.audioRecorderPlayer.mmssss(
                        Math.floor(e.current_position),
                    ),
                });
            });
            console.log(`uri: ${uri}`);
            this.setState({step: 1, filename: filename})
        }
    };

    onStopRecord = async () => {
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        this.setState({
            step: 2,
        });
        console.log(result);
    };

    onStartPlay = async (e) => {
        console.log('onStartPlay');
        const path = fs.ExternalStorageDirectoryPath+'/Cough On Covid/Media/hello.wav'
        const msg = await this.audioRecorderPlayer.startPlayer(path);
        this.audioRecorderPlayer.setVolume(1.0);
        console.log(msg);
        this.audioRecorderPlayer.addPlayBackListener((e) => {
            if (e.current_position === e.duration) {
                console.log('finished');
                this.audioRecorderPlayer.stopPlayer();
            }
            this.setState({
                currentPositionSec: e.current_position,
                currentDurationSec: e.duration,
                playTime: this.audioRecorderPlayer.mmssss(
                    Math.floor(e.current_position),
                ),
                duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            });
        });
    };

    async checkAudioPermission() {
        if(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO == PermissionsAndroid.RESULTS.GRANTED){
            return true
        }else{
            let res = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
            return (res === true || res === PermissionsAndroid.RESULTS.GRANTED)
        }
    }

    onPausePlay = async (e) => {
        await this.audioRecorderPlayer.pausePlayer();
    };

    onStopPlay = async (e) => {
        console.log('onStopPlay');
        this.audioRecorderPlayer.stopPlayer();
        this.audioRecorderPlayer.removePlayBackListener();
    };

    sendRecord = async () => {
        console.log("ok")
        this.setState({step: 3})
        setTimeout(async () => {
            try{
                let prediction = await api.getPrediction(this.state.filename)
                this.setState({step: 4, percent: prediction})
            }catch (e) {
                this.setState({step: 4, percent: -1})
            }
        }, 1000)
    }

    retryRecord = () => {
        this.setState({step: 0})
    }

    onStartRecordScreen = () => {
        return (
          <View style={{flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: "black"}}>
              <Image source={require('../../assets/images/loading.gif')} style={{width: device_width/1.5, height: device_width/1.5 }}></Image>
              <View style={{padding: device_width/5}}></View>
              <AudioButton
                  style={{margin: 15,padding: device_width/20, paddingLeft: device_width/18, paddingRight: device_width/18}}
                  onPress={() => {this.onStopRecord()}}
                  icon = {() => (<FontAwesome5 name="stop" size={14} color="white" />)}
              ></AudioButton>
          </View>
        );
    }

    beforeSendingRecordScreen = () => {
        return (
            <View style={{flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "black"}}>
                <View style={{padding: 20, justifyContent: "center", flex:1, alignItems: "center"}}>
                    <View style={{padding: 20}}>
                        <MaterialCommunityIcons name="file-music" size={100} color="white" />
                    </View>
                    <Text style={{color: "white", fontSize: device_width/21}}>{i18n.t("CoughTestSecond")}</Text>
                    <View style={{padding: 10, justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                        <AudioButton
                            style={{margin: 15, padding: device_width/20.5, paddingLeft: device_width/20.5, paddingRight: device_width/20.5}}
                            onPress={() => this.sendRecord()}
                            icon = {() => (<MaterialIcons name="send" size={20} color="white" />)}
                        ></AudioButton>
                        <AudioButton
                            style={{margin: 15,padding: device_width/22, paddingLeft: device_width/22, paddingRight: device_width/22}}
                            onPress={() => {this.retryRecord()}}
                            icon = {() => (<MaterialIcons name="refresh" size={23} color="white" />)}
                        ></AudioButton>
                    </View>
                </View>
            </View>
        );
    }

    RecordResultScreen = () => {
        let error = i18n.t("CoughTestError")
        let text = this.state.percent == -1 ? error: i18n.t("CoughTestThree") + this.state.percent + "%" + i18n.t("CoughTestFour")
        return (
            <View style={styles.main_container}>
                <FadeIn time={1500}>
                    <View style={{padding: 20}}>
                        <Text style={{color: "white", fontSize: device_width/16}}>{text}</Text>
                    </View>
                </FadeIn>
                <FadeIn time={1500}>
                    <View>
                        <View style={{marginTop: device_width/10, padding: 20, justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <Text style={{fontStyle: "italic", fontSize: 14, fontWeight: "bold", color: "white"}}>{i18n.t("CoughTestFifth")}</Text>
                            <AudioButton
                                style={{margin: 15,padding: device_width/22, paddingLeft: device_width/22, paddingRight: device_width/22}}
                                onPress={() => {this.retryRecord()}}
                                icon = {() => (<MaterialIcons name="refresh" size={23} color="white" />)}
                            ></AudioButton>
                        </View>
                    </View>
                </FadeIn>
            </View>
        );
    }

    waitingScreen = () => {
        return (
            <View style={{flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "black"}}>
                <Image source={require("../../assets/images/chargement.gif")}></Image>
            </View>
        );
    }

    defaultRecordScreen = () => {
        return (
            <View style={styles.main_container}>
                <View style={{padding: 20}}>
                    <Text style={{color: "white", fontSize: device_width/18}}>{i18n.t("CoughTestFirst")}</Text>
                </View>
                <AudioButton
                    onPress={() => this.onStartRecord()}
                    icon = {() => (<FontAwesome name="microphone" size={15} color="white" />)}
                ></AudioButton>
            </View>
        )
    }

    render() {
        if(this.state.step == 1){
            return this.onStartRecordScreen()
        }else if(this.state.step == 2){
            return this.beforeSendingRecordScreen()
        }else if(this.state.step == 3){
            return this.waitingScreen()
        }else if(this.state.step == 4){
            return this.RecordResultScreen()
        }else{
            return this.defaultRecordScreen()
        }
    }
}


//On recupère la largeur et la hauteur de l'écran
const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black"
    },

})

export default CoughTest