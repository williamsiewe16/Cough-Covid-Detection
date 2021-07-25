import {createAppContainer, createSwitchNavigator, ScrollView} from 'react-navigation'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from "react-navigation-stack";
import {createDrawerNavigator, DrawerNavigatorItems} from "react-navigation-drawer"
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import React from 'react'
import {Text, Image, Dimensions, StyleSheet, View, SafeAreaView} from 'react-native'
import myDrawer from "./Drawer"
import Accueil from "../Pages/Accueil";
import Onboarding from "../Pages/Onboarding";
import SplashScreen from "../Pages/SplashScreen";
import CoughTest from "../Pages/CoughTest";

/** Onglet News */
import News from "../Pages/News"
import Articles from "../Pages/Articles"
import ArticleView from "../Components/ArticleView"

/** Onglet Stats */
import Stats from "../Pages/Stats"
import CountrySearch from "../Pages/CountrySearch"

/** Onglets Infos */
import Infos from "../Pages/Infos"
import InfoView from "../Components/InfoView";

const device_width = Dimensions.get('window').width
const icon_width = 7*device_width/100

let StatsNavigation = createStackNavigator({
    Stats: {
        screen: Stats,
    },
    Search: {
        screen: CountrySearch,
    }
}, )

let NewsNavigation = createStackNavigator({
    News: {
        screen: News,
    },
    Articles: {
        screen: Articles,
    },
    ArticleView: {
        screen: ArticleView,
    },
}, {headerLayoutPreset : 'center'})

let InfosNavigation = createStackNavigator({
    Infos: {
        screen: Infos,
    },
    InfoView: {
        screen: InfoView,
    },
}, {headerLayoutPreset : 'center'})

let CoughTestNavigation = createStackNavigator({
    CoughTest: {
        screen: CoughTest,
    },
    InfoView: {
        screen: InfoView,
    },
}, {headerLayoutPreset : 'center'})


let AppNavigation = createSwitchNavigator({
    Home: createDrawerNavigator({
        coughTest: CoughTestNavigation, stats: StatsNavigation, news: NewsNavigation, infos: InfosNavigation,
    }, {
        contentComponent: myDrawer,
        drawerWidth: 2.2*device_width/3,
        contentOptions: {
            labelStyle: {fontFamily: "Raleway-Regular"},
            activeTintColor: "red",
            activeBackgroundColor: 'red',
        }
    }),
    splashscreen: SplashScreen,
    onBoarding: Onboarding,
},    {
    defaultNavigationOptions: {},
    initialRouteName: 'splashscreen'
})




const styles = StyleSheet.create({
    logo: {
        width: device_width/3, height: device_width/3
    },
})
export default createAppContainer(AppNavigation)
