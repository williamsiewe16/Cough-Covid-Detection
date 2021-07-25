import React from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    Button,
    ActivityIndicator,
    Text,
    ScrollView,
    Animated,
    Image,
    SectionList,
    TouchableOpacity
} from 'react-native'
import axios from 'axios'
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons'
import connect from "react-redux/lib/connect/connect";
import {SearchBar} from "react-native-elements";
import SearchResult from "../Components/SearchResult";
import api from "../services/service"
import i18n from "../i18n/i18n"
import HeaderIcon from "../Components/HeaderIcon";
console.disableYellowBox = true

//On recupère la largeur et la hauteur de l'écran
const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

const icon_width = 7*device_width/100

class CountrySearch extends React.Component {

    static navigationOptions = (props) => {
        return {
            title: i18n.t("countrySearchTitle"),
            headerStyle : {backgroundColor: "red", elevation: 2},
            headerTitleStyle : {color: "white"}
        }
    }

    constructor(props) {
        super(props)
        this.results = []
        this.state = {
            search: "",
            isLoading: false,
            hasContent: false
        }
    }

    _updateSearch = (search) => {
        if(search != "") {
            this.setState({search: search, isLoading: true, hasContent: false},() => {
                this._fetchResults(search)
            })
        }else {
            this.setState({search: search, isLoading: false, hasContent: false})
        }

    }

    _fetchResults = (search) => {
        api.searchCountries(search)
            .then(data => {
                this.results = data
                this.setState({isLoading: false, hasContent: true})
            })
            .catch(err => {
                console.log("an unexpected error occurred")
                this.setState({isLoading: false, hasContent: true})
            })
    }

    _navigate = (result) => {
        this.props.navigation.replace("Stats", result)
    }

    _inProgress = () => (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", padding: 20}}>
            <ActivityIndicator color={"black"} size={"large"}/>
        </View>
    )

    _noResult = (theme) => (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", padding: 20}}>
            <Text style={{color: theme.textColor}}>{i18n.t('countrySearchNoResult')}</Text>
        </View>
    )

    _displaySearchResults = (theme) => (
        <ScrollView style={styles.blocs_container} showsVerticalScrollIndicator={false}>
            <Text style={{fontWeight: "bold", letterSpacing: 2, color: theme.sectionTitleColor, marginBottom: 5}}>{i18n.t("countrySearchResults")}</Text>
            {this.results.map(result => (
                <SearchResult result={result} navigate={this._navigate} secondStyle={{backgroundColor: theme.boxBackgroundColor, color: theme.textColor, elevation: this.props.user.isDarkTheme ? 12 : 3}}/>
            ))}
        </ScrollView>

    )

    render() {
        let theme = this.props.isDarkTheme ? this.props.user.theme.dark : this.props.user.theme.default
        return (
            <View style={[styles.main_container, {backgroundColor: theme.backgroundColor}]}>
                <View style={styles.searchZone}>
                    <SearchBar
                        placeholder={i18n.t("countrySearchBarPlaceholder")}
                        onChangeText={this._updateSearch}
                        value={this.state.search}
                        inputContainerStyle={styles.searchBarDesign}
                        containerStyle={styles.searchBarContainerDesign}
                        inputStyle={{fontSize: device_width/22}}
                        onClear={() => this.setState({search: "", isLoading: false, hasContent: false})}
                        searchIcon={
                            <TouchableOpacity onPress={() => {}}>
                                <View><AntDesign name={"search1"} size={6*device_width/100}/></View>
                            </TouchableOpacity>
                        }
                    />
                    {
                        this.state.isLoading ? this._inProgress()
                            : !this.state.hasContent ? <View></View>
                            : this.results.length == 0 ? this._noResult(theme) : this._displaySearchResults(theme)
                    }
                </View>
            </View>
        )
    }

    componentDidMount() {
    }
}

const styles = StyleSheet.create({
    main_container: {
        backgroundColor: "black",//"rgb(250,250, 250)",
        padding: 15, flex: 1
    },
    loading_container : {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loader : {
        backgroundColor: '#4aaf78',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blocs_container: {
        flex: 1, padding: device_width/20,
    },
    searchZone: {
         flex: 1
    },
    searchBarDesign: {
        backgroundColor: 'white', fontSize: 10,
    },
    searchBarContainerDesign: {
        borderRadius: 5, marginBottom: 10,
        backgroundColor: "white", height: 50, elevation: 2,
        borderBottomWidth: 0, borderTopWidth: 0
    },
})

const mapStateToProps =  (state) => {
    return {
        user: state.userReducer,
        isDarkTheme: state.userReducer.isDarkTheme
    }
}


export  default  connect(mapStateToProps)(CountrySearch)
