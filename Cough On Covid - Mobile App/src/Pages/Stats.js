import React from 'react'
import {
    Dimensions,
    StyleSheet,
    View, TouchableOpacity,
    Text, Image, ScrollView, PermissionsAndroid
} from 'react-native'

import connect from "react-redux/lib/connect/connect";
import i18n from "../i18n/i18n"
import { FontAwesome5, AntDesign, Octicons, SimpleLineIcons } from '@expo/vector-icons'
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import api from "../services/service"
import HeaderIcon from "../Components/HeaderIcon";
import {VictoryPie,VictoryChart, VictoryAxis, VictoryLine} from "victory-native"

console.disableYellowBox = true

class Stats extends React.Component {

    static navigationOptions = (props) => {
        let param = props.navigation.state.params
        let icon = param ? {uri: param.image} : require('../../assets/images/world.png')
        let style = param ? {width: 9*device_width/100, height: 6*device_width/100} : {}
        return {
            headerLeft: () => (<HeaderIcon icon={icon} style={style} action={() => {
                props.navigation.openDrawer()
            }}/>),
            headerRight: () => (<HeaderIcon icon={require('../../assets/images/virus.png')}  action={() => {}}/>),
            headerTitle: param ? i18n.t("statsStatistics") : "COUGH ON COVID",
            headerStyle : {backgroundColor: "red", elevation: 0},
            headerTitleStyle : {color: "white"}
        }
    }

    _requestLocationPermission = async  () => {
        try {
            let isGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if(!isGranted){
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            }else{
                console.log("granted")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            display: false,
            blocs: {recovered: {}, infected: {}, critical: {}, deaths: {}},
            global: {cases: 0, deaths: 0}
        }
        let param = this.props.navigation.state.params
        param ? this._getCountryData(param) : this._getWorldWideData()
        /*this._requestLocationPermission().then(() => {})*/
    }

    _getCountryData = (country) => {
        api.getCountryData(country.code)
            .then(data => {
                let global = {cases: data.cases, deaths: data.deaths}
                let blocs = {
                    recovered: {color: "#4aaf78", number: data.todayRecovered, text: i18n.t("statsRecovered"), icon: () => (<FontAwesome5 name="heartbeat" size={device_width/7} color="#4aaf78" />)},
                    infected: {color: "red", number: data.todayCases, text: i18n.t("statsInfected"), icon: () => (<AntDesign name="addusergroup" size={device_width/7} color="red" />)},
                    critical: {color: "orange", number: data.critical, text: i18n.t("statsIntensiveCare"), icon: () => (<FontAwesome5 name="hospital" size={device_width/7} color="orange" />)},
                    deaths: {color: "rgb(80,80,80)", number: data.todayDeaths, text: i18n.t("statsDeaths"), icon: () => (<AntDesign name="deleteusergroup" size={device_width/7} color="rgb(80,80,80)" />)},
                }
                //console.log(data)
                setTimeout(() => this.setState({
                    display: true, global: global, blocs: blocs
                }), 1000)
            })
            .catch(err => {
                console.log("une erreur est survenue")
            })
    }

    _getWorldWideData = () => {
        api.getWorldWideData()
            .then(data => {
                let global = {cases: data.cases, deaths: data.deaths}
                let blocs = {
                    recovered: {color: "#4aaf78", number: data.todayRecovered, text: i18n.t("statsRecovered"), icon: () => (<FontAwesome5 name="heartbeat" size={device_width/7} color="#4aaf78" />)},
                    infected: {color: "red", number: data.todayCases, text: i18n.t("statsInfected"), icon: () => (<AntDesign name="addusergroup" size={device_width/7} color="red" />)},
                    critical: {color: "orange", number: data.critical, text: i18n.t("statsIntensiveCare"), icon: () => (<FontAwesome5 name="hospital" size={device_width/7} color="orange" />)},
                    deaths: {color: "rgb(80,80,80)", number: data.todayDeaths, text: i18n.t("statsDeaths"), icon: () => (<AntDesign name="deleteusergroup" size={device_width/7} color="rgb(80,80,80)" />)},
                }
                //console.log(data)
                setTimeout(() => this.setState({
                    display: true, global: global, blocs: blocs
                }), 1000)
            })
            .catch(err => {
                console.log("une erreur est survenue")
            })
    }

    _displayBloc = (display,global,theme) => {
        let secondStyle = {backgroundColor: theme.boxBackgroundColor}
        if (!display) {
            return (
                <View style={[styles.bloc, secondStyle]}>
                    <SkeletonPlaceholder>
                        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent={"space-around"} flex={1}>
                            <SkeletonPlaceholder.Item flex={1} height={60} justifyContent={"center"} alignItems={"center"}>
                                <SkeletonPlaceholder.Item width={device_width/6.4} height={16} borderRadius={4}/>
                                <SkeletonPlaceholder.Item width={device_width/4.1} height={16} marginTop={6} borderRadius={4}/>
                            </SkeletonPlaceholder.Item>
                            <SkeletonPlaceholder.Item flex={1} height={60} justifyContent={"center"} alignItems={"center"}>
                                <SkeletonPlaceholder.Item width={device_width/6.4} height={16} borderRadius={4}/>
                                <SkeletonPlaceholder.Item width={device_width/4.1} height={16} marginTop={6} borderRadius={4}/>
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>
                </View>
            )
        }else{
           return(
               <View style={[styles.bloc,secondStyle]}>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center", borderRightWidth: 1, borderRightColor: "rgb(215,215,215)"}}>
                       <Text style={{color: "grey"}}>{i18n.t("statsInfected")}</Text>
                       <Text style={[styles.number, {color: theme.textColor}]}>{global.cases}</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <Text style={{color: "grey"}}>{i18n.t("statsDeaths")}</Text>
                        <Text style={[styles.number, {color: theme.textColor}]}>{global.deaths}</Text>
                    </View>
               </View>
           )
        }
    }

    _displayBloc1 = (display,bloc,theme) => {
        let secondStyle = {backgroundColor: theme.boxBackgroundColor,elevation: this.props.user.isDarkTheme ? 12 : 3}
        if(!display){
            return(
                <View style={[styles.subBloc1, secondStyle]}>
                    <SkeletonPlaceholder>
                        <SkeletonPlaceholder.Item flexDirection="column" alignItems="center" justifyContent={"space-around"} flex={1}>
                            <SkeletonPlaceholder.Item width={device_width/6.4} height={device_width/6.4} borderRadius={50}/>
                            <SkeletonPlaceholder.Item width={device_width/4.1} height={15} marginTop={6} borderRadius={4}/>
                            <SkeletonPlaceholder.Item width={device_width/6.4} height={15} marginTop={6} borderRadius={4}/>
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>
                </View>
            )
        }else{
            return (
                <View style={[styles.subBloc1, secondStyle]}>
                    {bloc.icon()}
                    <Text style={[styles.number, {color: bloc.color}]}>{bloc.number}</Text>
                    <Text style={{color: "grey"}}>{bloc.text}</Text>
                </View>
            )
        }
    }

    render() {
        let {blocs, display, global} = this.state
        let param = this.props.navigation.state.params
        let topText = param ? param.name : i18n.t("statsWorldWide")
        let theme = this.props.isDarkTheme ? this.props.user.theme.dark : this.props.user.theme.default

        return (
            <View style={{flex: 1}}>
                <ScrollView style={[styles.main_container, {backgroundColor: theme.backgroundColor}]} showsVerticalScrollIndicator={false}>
                    <View style={styles.firstZone}>
                        <View style={styles.today}>
                            <Text style={styles.text}>{`${topText} ${i18n.t("statsToday").toLowerCase()}`}</Text>
                            {/*<Text style={styles.text}>{i18n.t("statsToday")}</Text>*/}
                        </View>
                        {this._displayBloc(display,global,theme)}
                    </View>
                    <View style={styles.secondZone}>
                        <View style={styles.today1}>
                            <Text style={{fontWeight: "bold", color: theme.sectionTitleColor}}>{i18n.t("statsCases")}</Text>
                            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                <Text style={{fontWeight: "bold",marginRight: 3, color: theme.sectionTitleColor}}>{i18n.t("statsToday")}</Text>
                                <AntDesign name={"caretdown"} color={theme.sectionTitleColor}/>
                            </View>
                        </View>
                        <View style={styles.bloc1}>
                            {Object.values(blocs).map(bloc => this._displayBloc1(display,bloc,theme))}
                        </View>
                    </View>
                    {/*  <View style={styles.thirdZone}>
                        <View style={styles.today1}>
                            <Text style={{fontWeight: "bold"}}>{i18n.t("statsEvolution")}</Text>
                            <Octicons name="graph" size={device_width/30} />
                        </View>
                        <ScrollView contentContainerStyle={styles.graphZone} showsVerticalScrollIndicator={false} horizontal={true}>
                            <View style={styles.graph}>
                                <VictoryChart>
                                    <VictoryAxis label={"cas"}/>
                                    <VictoryAxis label={"date"}/>
                                    <VictoryLine></VictoryLine>
                                </VictoryChart>
                            </View>
                            <View style={styles.graph}>
                                <VictoryChart>
                                    <VictoryAxis label={"cas"}/>
                                    <VictoryAxis label={"date"}/>
                                    <VictoryLine></VictoryLine>
                                </VictoryChart>
                            </View>
                        </ScrollView>
                    </View>*/ }
                </ScrollView>
                <TouchableOpacity activeOpacity={0.8} style={styles.search} onPress={() => {
                    this.props.navigation.navigate('Search')
                }}>
                    <Octicons name="search" size={device_width/18} color="white"/>
                </TouchableOpacity>
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
        justifyContent: 'center', backgroundColor: "yellow",
        alignItems: 'center',
    },
    main_container: {
        flex: 1,
    },

    /** First Zone */
    firstZone: {
        flex: 1, position: "relative"
    },
    today: {
        backgroundColor: "red", flexDirection: "row", position: "absolute",
        borderBottomLeftRadius: 30, borderBottomRightRadius: 30, width: device_width,
        justifyContent: "space-between", padding: device_width/24, paddingBottom: device_width/9,
    },
    bloc: {
        backgroundColor: "white", padding: device_width/15, elevation: 6,
        margin: device_width/11, marginTop: device_width/10,
        borderRadius: 8, justifyContent: "center", alignItems: "center", flexDirection: "row"
    },
    text: {
        color: "white",
    },
    number: {
        fontWeight: "bold", fontSize: 20
    },

    /** Second Zone */
    secondZone: {

    },
    today1: {
        flexDirection: "row", justifyContent: "space-between", padding: device_width/40
    },
    bloc1: {
        width: device_width,  flexDirection: "row", flexWrap: "wrap", padding: 5
    },
    subBloc1: {
        backgroundColor: "white", padding: 10, elevation: 3, margin: 5,width: device_width/2.2,
        borderRadius: 6, justifyContent: "center", alignItems: "center",
    },

    /** Third Zone */
    thirdZone: {
        marginTop: device_width/20
    },
    graphZone: {

    },
    graph: {
        backgroundColor: "white", elevation: 6, margin: 10, marginBottom: 20,
        borderRadius: 8, justifyContent: "center", alignItems: "center",
    },


    /** Search */
    search: {
        backgroundColor: "rgb(28,80,200)", bottom: 15, right: 15,
        borderRadius: 50, elevation: 6, padding: 18, position: "absolute"
    }

})

const mapStateToProps =  (state) => {
    return {
        user: state.userReducer,
        isDarkTheme: state.userReducer.isDarkTheme
    }
}


export  default  connect(mapStateToProps)(Stats)
