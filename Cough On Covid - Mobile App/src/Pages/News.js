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
import { EvilIcons } from '@expo/vector-icons';

console.disableYellowBox = true

class News extends React.Component {

    static navigationOptions = (props) => {
        return {
            headerLeft: () => (<TouchableOpacity style={{padding: 10}} activeOpacity={0.5} onPress={() => props.navigation.openDrawer()}>
                <EvilIcons name="navicon" size={30} color="black" />
            </TouchableOpacity>),
            headerRight: () => (<HeaderIcon icon={require('../../assets/images/virus.png')} action={() => {}}/>),
            headerTitle: "NEWS",
            headerStyle : {backgroundColor: "red", elevation: 0},
            headerTitleStyle : {color: "white"}
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            search: '',
            places: [
                {name: i18n.t("NewsFrance"), image: require('../../assets/images/fr.png'), text: "coronavirus in France", height: 40},
                {name: i18n.t("NewsAfrica"), image: require('../../assets/images/world.png'), text: "coronavirus in Africa"},
                {name: i18n.t("NewsEurope"), image: require('../../assets/images/world.png'), text: "coronavirus in Europe"},
                {name: i18n.t("NewsAmerica"), image: require('../../assets/images/world.png'), text: "coronavirus in America"},
                {name: i18n.t("NewsAsia"), image: require('../../assets/images/world.png'), text: "coronavirus in Asia"},
            ],
        }
    }

    _navigate = (text) => {
        this.props.navigation.navigate("Articles", {text: text})
    }

    render() {
        let places = this.state.places
        let theme = this.props.isDarkTheme ? this.props.user.theme.dark : this.props.user.theme.default
        let secondStyle = {backgroundColor: theme.boxBackgroundColor, color: theme.textColor, elevation: this.props.user.isDarkTheme ? 12 : 3}
        return (
            <View style={[styles.main_container, {backgroundColor: theme.backgroundColor}]}>
                {places.map(place => (
                    <TouchableOpacity style={[styles.bloc, secondStyle]} activeOpacity={0.8} onPress={() => this._navigate(place.text)}>
                        <Image source={place.image} style={{width: place.width? place.width:60, height: place.height? place.height:60, marginBottom: 5}}/>
                        <Text style={{color: secondStyle.color}}>{place.name}</Text>
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
        backgroundColor: "white", padding: 10, elevation: 8, margin: 6,
        borderRadius: 4, justifyContent: "center", alignItems: "center"
    }

})

const mapStateToProps =  (state) => {
    return {
        user: state.userReducer,
        isDarkTheme: state.userReducer.isDarkTheme
    }
}


export  default  connect(mapStateToProps)(News)
