import React from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    Text, Image, TouchableOpacity
} from 'react-native'

import HeaderIcon from "../Components/HeaderIcon";
import i18n from "../i18n/i18n";
import connect from "react-redux/lib/connect/connect";
import {EvilIcons} from "@expo/vector-icons";

console.disableYellowBox = true

class Infos extends React.Component {

    static navigationOptions = (props) => {
        return {
            headerLeft: () => (<TouchableOpacity style={{padding: 10}} activeOpacity={0.5} onPress={() => props.navigation.openDrawer()}>
                <EvilIcons name="navicon" size={30} color="black" />
            </TouchableOpacity>),
            headerRight: () => (<HeaderIcon icon={require('../../assets/images/virus.png')} action={() => {}}/>),
            headerTitle: "INFOS",
            headerStyle : {backgroundColor: "red", elevation: 0},
            headerTitleStyle : {color: "white"}
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            locale: "",
            search: '',
            places: [
                {id: 0, text: i18n.t("InfosCovid19"), image: require('../../assets/images/c19.png')},
                {id: 1, text: i18n.t("InfosPrecautions"), image: require('../../assets/images/precautions.png')},
                {id: 2, text: i18n.t("InfosAutoControl"), image: require('../../assets/images/autoControl.png'), url: "https://maladiecoronavirus.fr/"},
            ],
        }
        this.setState({locale: this.props.user.locale})
    }

    _navigate = (data) => {
        this.props.navigation.navigate("InfoView", data)
    }

    render() {
        let places = this.state.places
        let theme = this.props.isDarkTheme ? this.props.user.theme.dark : this.props.user.theme.default
        let secondStyle = {backgroundColor: theme.boxBackgroundColor, color: theme.textColor, elevation: this.props.user.isDarkTheme ? 12 : 3}
        return (
            <View style={[styles.main_container, {backgroundColor: theme.backgroundColor}]}>
                {places.map(place => (
                    <TouchableOpacity style={[styles.bloc, secondStyle]} activeOpacity={0.8} onPress={() => {
                        let data = {id: place.id}
                        place.url ? data.url = place.url : ""
                        this._navigate(data)
                    }}>
                        <Image source={place.image} style={{width: place.width? place.width:60, height: place.height? place.height:60, marginBottom: 5}}/>
                        <Text style={{color: secondStyle.color}}>{place.text}</Text>
                    </TouchableOpacity>
                ))}
            </View>
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
        backgroundColor: "black", /*rgb(240,240,240)",*/ padding: 30
    },
    bloc: {
        backgroundColor: "white", padding: 10, elevation: 20, margin: 13,
        borderRadius: 4, justifyContent: "center", alignItems: "center"
    }

})

const mapStateToProps =  (state) => {
    return {
        user: state.userReducer,
        isDarkTheme: state.userReducer.isDarkTheme
    }
}


export  default  connect(mapStateToProps)(Infos)
