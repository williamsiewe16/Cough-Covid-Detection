import React from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    Text, Image
} from 'react-native'

import WebView from "react-native-webview"
import i18n from "../i18n/i18n";
import HeaderIcon from "../Components/HeaderIcon";
import connect from "react-redux/lib/connect/connect";

console.disableYellowBox = true

class ArticleView extends React.Component {

    static navigationOptions = (props) => {
        return {
            headerRight: () => (<HeaderIcon icon={require('../../assets/images/virus.png')} action={() => {}}/>),
            headerTitle: "NEWS",
            headerStyle : {backgroundColor: "red", elevation: 0},
            headerTitleStyle : {color: "white"}
        }
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let url = this.props.navigation.state.params.url
        let theme = this.props.isDarkTheme ? this.props.user.theme.dark : this.props.user.theme.default
        return (
            <WebView style={[styles.main_container, {backgroundColor: theme.backgroundColor}]} source={{ uri: url }} />
        )
    }
}


//On recupère la largeur et la hauteur de l'écran
const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },

})

const mapStateToProps =  (state) => {
    return {
        user: state.userReducer,
        isDarkTheme: state.userReducer.isDarkTheme
    }
}


export  default  connect(mapStateToProps)(ArticleView)
