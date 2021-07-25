import React from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    Slider,
    Button,
    ActivityIndicator,
    Text,
    ScrollView,
    Animated,
    Image,
    SectionList,
    TouchableOpacity
} from 'react-native'
import WebView from "react-native-webview"
import connect from "react-redux/lib/connect/connect";
import HeaderIcon from "../Components/HeaderIcon";
import i18n from "../i18n/i18n"

console.disableYellowBox = true

class Covid19 extends React.Component {

    static navigationOptions = (props) => {
        return {
            headerRight: () => (<HeaderIcon icon={require('../../assets/images/virus.png')} action={() => {}}/>),
            headerTitle: "INFOS",
            headerStyle : {backgroundColor: "red", elevation: 0},
            headerTitleStyle : {color: "white"}
        }
    }

    _precautions = (theme) => {
        return (
            <ScrollView>
                {this.precautions.map(bloc => (
                    <ScrollView style={[styles.main_container, {backgroundColor: theme.backgroundColor}]}>
                        <View style={[styles.bloc,{backgroundColor: theme.boxBackgroundColor}]}>
                            <Text style={[styles.titre_container,{color: theme.textColor}]}>{bloc.titre}</Text>
                            <Text style={[{marginTop: 10, color: theme.textColor}]}>{bloc.text}</Text>
                        </View>
                    </ScrollView>
                ))}
            </ScrollView>
        )
    }

    _covid19 = (theme) => {
        return (
            <ScrollView>
                {this.covid19.map(bloc => (
                    <ScrollView style={[styles.main_container, {backgroundColor: theme.backgroundColor}]}>
                        <View style={[styles.bloc,{backgroundColor: theme.boxBackgroundColor}]}>
                            <Text style={[styles.titre_container,{color: theme.textColor}]}>{bloc.titre}</Text>
                            <Text style={[{marginTop: 10, color: theme.textColor}]}>{bloc.text}</Text>
                        </View>
                    </ScrollView>
                ))}
            </ScrollView>
        )
    }

    _autoControle = (theme) => {
        let url = this.props.navigation.state.params.url
        return (
            <WebView style={[styles.main_container, {backgroundColor: theme.backgroundColor}]} source={{ uri: url }} />
        )
    }

    constructor(props) {
        super(props)
        this.state = {
            search: '',
            isLoading: false,
            hasContain: true
        }
        this.covid19 = [
            {titre: i18n.t("InfosCovid19_1_title"), text: i18n.t("InfosCovid19_1_text")},
            {titre: i18n.t("InfosCovid19_2_title"), text: i18n.t("InfosCovid19_2_text")},
            {titre: i18n.t("InfosCovid19_3_title"), text: i18n.t("InfosCovid19_3_text")},
            {titre: i18n.t("InfosCovid19_4_title"), text: i18n.t("InfosCovid19_4_text")},
        ]

        this.precautions = [
            {titre: i18n.t("InfosPrecautions_1_title"), text: i18n.t("InfosPrecautions_1_text")},
            {titre: i18n.t("InfosPrecautions_2_title"), text: i18n.t("InfosPrecautions_2_text")},
            {titre: i18n.t("InfosPrecautions_3_title"), text: i18n.t("InfosPrecautions_3_text")},
            {titre: i18n.t("InfosPrecautions_4_title"), text: i18n.t("InfosPrecautions_4_text")},
        ]
    }

    render() {
        let id = this.props.navigation.state.params.id
        let theme = this.props.isDarkTheme ? this.props.user.theme.dark : this.props.user.theme.default
        return(
            id == 0 ? this._covid19(theme) :
                    id == 1 ? this._precautions(theme) :
                    id == 2 ? this._autoControle(theme) : <View></View>
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
    main_container: {
        flex: 1,
    },
    titre_container:{
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    bloc: {
        padding: device_width/15, elevation: 6, margin: device_width/20,
        borderRadius: 8, justifyContent: "center", alignItems: "center"
    }

})

const mapStateToProps =  (state) => {
    return {
        user: state.userReducer,
        isDarkTheme: state.userReducer.isDarkTheme
    }
}


export  default  connect(mapStateToProps)(Covid19)


