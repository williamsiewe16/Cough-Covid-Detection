import React from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    Text, Image, TouchableOpacity
} from 'react-native'

import i18n from "../i18n/i18n";

console.disableYellowBox = true

class Article extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let {title,subtitle, link, image, source, time} = this.props.article
        let secondStyle = this.props.secondStyle
        return (
            <TouchableOpacity activeOpacity={0.7} style={[styles.bloc, secondStyle]} onPress={() => this.props.navigate(link)}>
                <View style={styles.zone1}>
                    <Text style={[styles.title, {color: secondStyle.color}]}>{title}</Text>
                    <Text style={styles.subtitle} numberOfLines={5}>{subtitle}</Text>
                </View>
                <View style={styles.zone2}>
                    <Image source={{uri: image}} style={styles.image}/>
                </View>
            </TouchableOpacity>
        )
    }
}


//On recupère la largeur et la hauteur de l'écran
const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: "rgb(240,240,240)"
    },
    bloc: {
        backgroundColor: "white", padding: device_width/15, elevation: 6,
        margin: device_width/15, marginTop: device_width/12,
        borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row"
    },
    zone1: {flex: 5, marginRight: 6, padding: 6},
    zone2: {flex: 1, justifyContent: "center", alignItems: "center"},
    image: {width: device_width/7, height: device_width/7},
    title: {fontSize: 12, paddingBottom: 6, fontWeight: "bold"},
    subtitle: {color: "grey", fontSize: 10}

})

export  default Article
