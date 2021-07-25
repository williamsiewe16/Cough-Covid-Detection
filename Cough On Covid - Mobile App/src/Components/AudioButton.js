import React from 'react'
import {
    Dimensions,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
console.disableYellowBox = true

//On recupère la largeur et la hauteur de l'écran
const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

class AudioButton extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let {onPress, icon, style} = this.props
        return (
            <TouchableOpacity style={[styles.main_container,style]} onPress={() => {
                onPress()
            }} activeOpacity={0.8}>
                {icon()}
            </TouchableOpacity>
        )
    }

    componentDidMount() {
    }
}

const styles = StyleSheet.create({
    main_container: {
        padding: device_width/20, paddingLeft: device_width/17, paddingRight: device_width/17,
        justifyContent: "flex-start", alignItems: "center",
        elevation: 4,
        backgroundColor: "red", borderRadius: 200
    },
})

export default AudioButton
