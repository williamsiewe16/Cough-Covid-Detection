// Components/Favorites.js

import React from 'react'
import { View, Animated, Dimensions,StyleSheet } from 'react-native'
import Cancel from '../Components/Cancel'

class FadeIn extends React.Component {

    constructor(props){
        super(props)
        this.state= {
            heightValue: new Animated.Value(device_height),
            cancelOpacityValue: new Animated.Value(0)
        }
    }

    _AnimateUp = () => {
        Animated.timing(this.state.heightValue, {toValue: device_height/2, duration: this.props.time,}).start()
    }

    _AnimateDown = () => {
        Animated.timing(this.state.heightValue, {toValue: device_height, duration: this.props.time,}).start()
    }

    _showCancel = () => {
        Animated.timing(this.state.cancelOpacityValue, {toValue: 1, duration: this.props.time,}).start()
    }

    _hideCancel = () => {
        Animated.timing(this.state.cancelOpacityValue, {toValue: 0, duration: this.props.time,}).start()
    }

    render() {
        return (

            <Animated.View style={{
                ...styles.main_container,
                height: this.state.heightValue,
                backgroundColor: this.props.color,
            }}>
                {this.props.children}
                <Animated.View style={{...styles.cancel,opacity: this.state.cancelOpacityValue}}>
                   <Cancel action={() => {
                       this._hideCancel()
                       this._AnimateDown()
                       this.props.appear()
                   }}/>
                </Animated.View>
            </Animated.View>
        )
    }
}

//On recupère la largeur et la hauteur de l'écran
const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

const styles = StyleSheet.create({
    main_container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomEndRadius: device_width/3,
        borderBottomLeftRadius: device_width/3,
        width: device_width,
        marginBottom: device_width/12
    },
    cancel: {
        display: "none",
        position: "absolute",
        bottom: 0-(device_width/15)
    }

})


export default FadeIn
