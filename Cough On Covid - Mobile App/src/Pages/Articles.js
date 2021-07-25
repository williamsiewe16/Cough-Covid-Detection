import React from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    Text, Image, FlatList, ActivityIndicator
} from 'react-native'

import Article from "../Components/Article";
import i18n from "../i18n/i18n";
import api from "../services/service"
import {AntDesign, FontAwesome5} from "@expo/vector-icons";
import HeaderIcon from "../Components/HeaderIcon";
import connect from "react-redux/lib/connect/connect";

console.disableYellowBox = true

class Articles extends React.Component {

    static navigationOptions = (props) => {
        return {
            /* headerLeft: () => (<HeaderIcon icon={icon} style={style} action={() => {
                 props.navigation.openDrawer()
             }}/>),*/
            headerRight: () => (<HeaderIcon icon={require('../../assets/images/virus.png')} action={() => {}}/>),
            headerTitle: "NEWS",
            headerStyle : {backgroundColor: "red", elevation: 0},
            headerTitleStyle : {color: "white"}
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            articles: [
                {
                    "id": 0,
                    "title": "California Activates 'Mass Fatality' Program As State Sets New Virus Records",
                    "subtitle": "California Gov. Gavin Newsom said the state has 60 refrigerated units available if needed. He also said that 5000 body bags were distributed to some of the ...",
                    "link": "https://news.google.com/articles/CAIiEDJBZukRjhrSIBiJTT4lCu4qFggEKg4IACoGCAow9vBNMK3UCDCvpUk?hl=en-US&gl=US&ceid=US%3Aen",
                    "image": "https://lh3.googleusercontent.com/R0MftnR__2datpi9hc66cfR7S3X5S2jDLUf5ZZaSjBZwy8Aa7crcsRqAFGuAOtX4sSVdaH6RboA8gK0dRw=-p-df-h100-w100-rw",
                    "source": "NPR",
                    "time": "1 hour ago"
                },
                {
                    "id": 1,
                    "title": "Florida coronavirus: State reports 13,148 new cases, 3rd-most coronavirus cases ever in single day",
                    "subtitle": "The Florida Department of Health reported more than 13148 new cases on Thursday.",
                    "link": "https://news.google.com/articles/CBMifWh0dHBzOi8vd3d3LndmbGEuY29tL2NvbW11bml0eS9oZWFsdGgvY29yb25hdmlydXMvZmxvcmlkYS1jb3JvbmF2aXJ1cy1zdGF0ZS1yZXBvcnRzLTEzMTQ4LW5ldy1jYXNlcy0zMjItbmV3LWhvc3BpdGFsaXphdGlvbnMv0gGBAWh0dHBzOi8vd3d3LndmbGEuY29tL2NvbW11bml0eS9oZWFsdGgvY29yb25hdmlydXMvZmxvcmlkYS1jb3JvbmF2aXJ1cy1zdGF0ZS1yZXBvcnRzLTEzMTQ4LW5ldy1jYXNlcy0zMjItbmV3LWhvc3BpdGFsaXphdGlvbnMvYW1wLw?hl=en-US&gl=US&ceid=US%3Aen",
                    "image": "https://lh3.googleusercontent.com/proxy/IPr9XnbuzL2Dn1mOxPYl-YMNmXt1OOD6-ByBKPC-rLdrPJrdarja4FP0DULBN6jZVRCtSpkg92PZEYltBKU9OKXyxQnYKK3MNHX1SY-fGied4FdgyTTp3aXcdw3DFuR71p1Sktmupjin5g=-p-df-h100-w100-rw",
                    "source": "WFLA",
                    "time": "3 hours ago"
                }
            ],
            hasData: false
        }
        let text = this.props.navigation.state.params.text
         this._getArticles(text)
    }

    _inProgress = (theme) => (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: theme.backgroundColor}}>
            <ActivityIndicator color={theme.sectionTitleColor} size={"large"}/>
        </View>
    )

    _navigate = (link) => {
        this.props.navigation.navigate("ArticleView", {url: link})
    }

    _getArticles = () => {
        let text = this.props.navigation.state.params.text
        api.getArticles(text)
            .then(data => {
                this.setState({
                    articles: data, hasData: true
                })
               // setTimeout(() => {}, 1000)
            })
            .catch(err => {
                console.log("une erreur est survenue")
            })
    }


    render() {
        let theme = this.props.isDarkTheme ? this.props.user.theme.dark : this.props.user.theme.default
        let secondStyle = {backgroundColor: theme.boxBackgroundColor, color: theme.textColor, elevation: this.props.user.isDarkTheme ? 12 : 3}
        return (
            !this.state.hasData ? this._inProgress(theme) :
            <FlatList
                style={{backgroundColor: theme.backgroundColor}}
                data = {this.state.articles}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <Article article={item} navigate={this._navigate} secondStyle={secondStyle}/>}
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
    main_container: {
        flex: 1,
        backgroundColor: "rgb(240,240,240)", padding: device_width/15
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


export  default  connect(mapStateToProps)(Articles)

