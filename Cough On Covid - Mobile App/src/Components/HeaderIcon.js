import React from 'react'
import { Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'

//Il s'agit des icones qui sont affichées sur les Header des StackNavigation
class HeaderIcon extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        let {action, icon, style} = this.props
        return(
            <TouchableOpacity activeOpacity={0.5} onPress={() => action()} style={styles.main_container}>
                <Image source={icon} style={style ? [styles.icon,style] : styles.icon}/>
            </TouchableOpacity>

    )
    }
}

//On recupère la largeur de l'écran
const device_width = Dimensions.get('window').width


const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        padding: 1.5*device_width/100,
    },
    icon: {
        width: 8*device_width/100,
        height: 8*device_width/100
    }
})

export default HeaderIcon
