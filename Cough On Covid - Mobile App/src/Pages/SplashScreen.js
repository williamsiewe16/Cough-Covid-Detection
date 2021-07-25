import React from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    Image,
} from 'react-native'

console.disableYellowBox = true

class SplashScreen extends React.Component {

    static navigationOptions =  {
        title: 'Splashscreen',
    }

    constructor(props) {
        super(props)
        setTimeout(() => {this._onDone()}, 2200)
    }

    _onDone = () => {
        this.props.navigation.navigate('onBoarding')
    }

    render() {
        return (
            <View style={styles.main_container} >
                <Image source={require('../../assets/images/LearningCovid.gif')} style={{width: device_width/1.4, height: device_height/4.5}}/>
            </View>
        )
    }
}


//On recupère la largeur et la hauteur de l'écran
const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

})

export default SplashScreen