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
    SectionList,
    TouchableOpacity
} from 'react-native'
import axios from 'axios'
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons'
import connect from "react-redux/lib/connect/connect";

console.disableYellowBox = true

//On recupère la largeur et la hauteur de l'écran
const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

class SearchResult extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let {result, secondStyle} = this.props
        return (
            <TouchableOpacity style={[styles.bloc,secondStyle]} onPress={() => {
                this.props.navigate(result)
            }} activeOpacity={0.7}>
                <Image source={{uri: result.image}} style={{width: 60, height: 40, marginBottom: 5}}/>
                <Text style={{color: secondStyle.color}}>{result.name}</Text>
            </TouchableOpacity>
        )
    }

    componentDidMount() {
    }
}

const styles = StyleSheet.create({
    main_container: {
        fontFamily: "arial",
        flex: 1, padding: 15, flexDirection: "row",
        justifyContent: "flex-start", alignItems: "center"
    },
    zone2: {
        marginLeft: 10
    },
    bloc: {
        backgroundColor: "white", padding: 10, elevation: 5, margin: 10,
        borderRadius: 4, justifyContent: "center", alignItems: "center"
    },
})

export  default SearchResult
