import React from 'react'
import { Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'

//Il s'agit des icones qui sont affichées sur les Header des StackNavigation
class BottomIcon extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
               <Image source={this.props.icon} style={styles.icon}/>
        )
    }
}

//On recupère la largeur de l'écran
const device_width = Dimensions.get('window').width


const styles = StyleSheet.create({
        main_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.7,
        backgroundColor:'#555a64',
        borderRadius: 200,
        padding: 3.5*device_width/100,
    },
    icon: {
        width: 65*device_width/100,
        height: 65*device_width/100
    }
})

export default BottomIcon
