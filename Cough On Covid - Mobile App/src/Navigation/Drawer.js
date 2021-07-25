import {Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Linking} from "react-native";
import DrawerSection from "react-native-paper/src/components/Drawer/DrawerSection";
import DrawerItem from "react-native-paper/src/components/Drawer/DrawerItem";
import {FontAwesome, Ionicons, Entypo, AntDesign} from "@expo/vector-icons";
import {Switch} from "react-native-paper";
import React, {useState} from "react";
import connect from "react-redux/lib/connect/connect";
import DropDownPicker from 'react-native-dropdown-picker'
import i18n from "../i18n/i18n";
import {fontFamily} from "../../App";
import RNRestart from 'react-native-restart'

const device_width = Dimensions.get('window').width

let myDrawer = props => {
    let changeTheme = () => props.dispatch({type: "CHANGE_THEME"})
    let changeLanguage = (locale) => {
        props.dispatch({type: "CHANGE_LANGUAGE", value: {locale: locale}})
        RNRestart.Restart();
    }
    let theme = props.isDarkTheme ? props.user.theme.dark : props.user.theme.default
    let drawerSectionTheme = {fonts: {medium: {fontFamily: fontFamily}}, colors: {text: theme.sectionTitleColor}}
    let drawerItemTheme = {fonts: {medium: {fontFamily: fontFamily}}, colors: {text: theme.textColor}}
    i18n.locale = props.user.locale
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme.drawerBackgroundColor}}>
            <View style={{justifyContent: "center", alignItems: "center",  marginBottom: 8, position: 'relative'}}>
                <Image source={require('../../assets/images/covid.png')} style={styles.logo} blurRadius={1.5}/>
            </View>
            <ScrollView contentContainerStyle={{flex: 1, paddingRight: 8}}>
                <DrawerSection>
                    <DrawerItem icon={({color, size}) => (<Ionicons name="ios-stats" size={size}  color={theme.textColor} />)} label={"STATS"} theme={drawerItemTheme} onPress={() => {props.navigation.navigate("stats")}}></DrawerItem>
                    <DrawerItem icon={({color, size}) => (<FontAwesome name={"newspaper-o"} size={size-7}  color={theme.textColor} />)} label={"NEWS"} theme={drawerItemTheme} onPress={() => {props.navigation.navigate("news")}}></DrawerItem>
                    <DrawerItem icon={({color,size}) => (<Ionicons name="md-information-circle-outline" size={size} color={theme.textColor} />)} label={"INFOS"} theme={drawerItemTheme} onPress={() => {props.navigation.navigate("infos")}}></DrawerItem>
                    <DrawerItem icon={({color,size}) => (<Image source={require('../../assets/images/cough.jpg')} style={{paddingLeft: -20, width: size, height: size}} color={theme.textColor} />)} label={"COUGH TEST"} theme={drawerItemTheme} onPress={() => {props.navigation.navigate("coughTest")}}></DrawerItem>
                </DrawerSection>
                <DrawerSection title={"Preferences"} theme={drawerSectionTheme}>
                    <View style={styles.style1}>
                        <DrawerItem icon={({color, size}) => (<FontAwesome name="moon-o" size={size} color={theme.textColor} />)} label={i18n.t("DrawerDarkTheme")} theme={drawerItemTheme}></DrawerItem>
                        <Switch value={props.isDarkTheme} onValueChange={() => changeTheme()}/>
                    </View>
                    <View style={styles.style1}>
                        <DrawerItem icon={({color, size}) => (<FontAwesome name="language" size={size} color={theme.textColor} />)} label={i18n.t("DrawerLanguage")} theme={drawerItemTheme}></DrawerItem>
                        <DropDownPicker
                            items={[
                                {label: '', value: 'en', icon: () => <Image source={require("../../assets/images/us.png")} style={{width: 30, height: 20}}/>},
                                {label: '', value: 'fr', icon: () => <Image source={require("../../assets/images/fr.png")} style={{width: 30, height: 20}}/>},
                            ]}
                            defaultValue={props.user.locale}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa'}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => changeLanguage(item.value)}
                        />
                    </View>
                </DrawerSection>
                <DrawerSection title={"Contact"} theme={drawerSectionTheme}>
                    <View style={{justifyContent: "center", flexDirection: "row"}}>
                        <TouchableOpacity activeOpacity={1} onPress={() => Linking.openURL("https://www.facebook.com")}>
                            <Entypo name="facebook" size={device_width/11} color="#3b5998" style={{margin: 5}}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={() => Linking.openURL("https://www.linkedin.com")}>
                            <AntDesign name="linkedin-square" size={device_width/11} color="#0e76a8" style={{margin: 5}}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={() => Linking.openURL("https://www.twitter.com")}>
                            <AntDesign name="twitter" size={device_width/11} color="#00acce" style={{margin: 5}}/>
                        </TouchableOpacity>
                    </View>
                </DrawerSection>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 2.2*device_width/3, height: 1.2*device_width/3,
    },
    style1: {
        flexDirection: "row", justifyContent: "space-between", alignItems: "center"
    }
})
const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        isDarkTheme: state.userReducer.isDarkTheme
    }
}

export default connect(mapStateToProps)(myDrawer)
