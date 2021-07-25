import React from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    Button,
    ActivityIndicator,
    Text,
    ScrollView,
    Animated,
    Image,
    PermissionsAndroid,
} from 'react-native'

import RNFetchBlob from "rn-fetch-blob";
import fs from "react-native-fs"
import OnBoarding from "react-native-onboarding-swiper"
import axios from 'axios'
import BottomIcon from "../Components/BottomIcon";
import connect from "react-redux/lib/connect/connect";
import i18n from "../i18n/i18n"

console.disableYellowBox = true

class Onboarding extends React.Component {

    static navigationOptions =  {
        title: 'Accueil',
    }

    constructor(props) {
        super(props)
        this._createAppDirectory()
        console.log(this.props.user.firstLaunch)
        if(!this.props.user.firstLaunch) this.props.navigation.navigate("Home")

        this.pages=[{
            backgroundColor: '#ffffff',
            image: <BottomIcon icon={require('../../assets/images/news.png')} />,
            title: 'News',
            subtitle: i18n.t("onboardingNews"),
        },{
            title: 'Stats',
            backgroundColor: '#ffffff',
            image: <BottomIcon icon={require('../../assets/images/stats.png')} />,
            subtitle: i18n.t("onboardingStats"),
        },{
            title: 'Infos',
            backgroundColor: '#ffffff',
            image: <BottomIcon icon={require('../../assets/images/social.png')} />,
            subtitle: i18n.t("onboardingInfos"),
        }]
    }

    _onDone = () => {
        this.props.dispatch({type: "FIRST_LAUNCH"})
        this.props.navigation.navigate('Home')
    }

    _createAppDirectory = () => {
        let path = fs.ExternalStorageDirectoryPath+"/Cough On Covid"
        fs.exists(path).then(alreadyCreated => {
            if(!alreadyCreated){
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
                    .then(res => {
                        fs.mkdir(path).then(res => {
                            fs.mkdir(path+"/Media")
                        })
                    })
            }
        })
    }

    render() {
        return (
            <OnBoarding
                pages={this.pages} style={styles.main_container}
                onDone={this._onDone}
                onSkip={this._onDone}
                bottomBarHighlight={false}
            />
        )
    }

    componentDidMount() {
    }
}


//On recupère la largeur et la hauteur de l'écran
const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

const styles = StyleSheet.create({

    loading_container : {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loader : {
        backgroundColor: '#4aaf78',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main_container: {
        flex: 1,
    },

})

const mapStateToProps =  (state) => {
    return {
        user: state.userReducer,
    }
}

export  default  connect(mapStateToProps)(Onboarding)
