// Components/Favorites.js

import React from 'react'
import { Animated, Dimensions } from 'react-native'

class FadeIn extends React.Component {

    constructor(props){
        super(props)
        this.state= {
            opacityValue: new Animated.Value(0)
        }
    }

    componentDidMount() {
        Animated.timing(
            this.state.opacityValue,
            {
                toValue: 1,
                duration: this.props.time,
            }
        ).start()
    }

    componentDidUpdate() {
        Animated.spring(
            this.state.opacityValue,
            {
                toValue: 1,
                duration: this.props.time,
            }
        ).start()
    }

    render() {
        return (
            <Animated.View style={{opacity: this.state.opacityValue}}>
                {this.props.children}
            </Animated.View>
        )
    }
}


export default FadeIn