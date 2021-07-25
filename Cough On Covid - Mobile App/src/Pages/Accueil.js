import React from 'react'

import {

    Dimensions,

    StyleSheet,

    View,

    Slider,

    Button,

    ActivityIndicator,

    Text,

    ScrollView,

    Animated,

    Image,

    SectionList,

    TouchableOpacity

} from 'react-native'



import OnBoarding from "react-native-onboarding-swiper"

import Snackbar from 'react-native-snackbar'

import { SearchBar } from "react-native-elements"

import { FontAwesome, Ionicons } from '@expo/vector-icons'

import axios from 'axios'

import connect from "react-redux/lib/connect/connect";


console.disableYellowBox = true



let covid19 = [

    {

        titre:"LES EFFETS DU COVID 19 DIFFERENT D'UN INDIVIDU A UN AUTRE.",

        text:"Les symptômes les plus connus sont: \n -une sensation de fatigue \n -une toux sèche \n -des coubatures et des douleurs \n -une congestion nasale \n un écoulement nasal \n -des maux de gorge \n -des diarrhées. \n En moyenne , les symptômes apparaissent 5 ou 6 jours après qu'une personne a été infectée par le virus, mais cela peut aller jusqu'à 14 jours. \n  Les personnes qui présentent des symtômes bénins et n'ont pad d'autres problèmes de santé doivent  s'isoler. \n  Consultez un médecin si vous avez de la fièvre, que vous toussez et que vous avez des difficultés à respirer.Prévenez le service concerné par le téléphone au préalable."

    },

    {

        titre:"PREVENTIONS",

        text:"1.RESTEZ  chez vous autant que possible. \n  2.GARDEZ une distance de sécurité \n  3.LAVEZ VOUS souvent les mains. \n  4.COUVREZ-VOUS la bouche quand vous toussez. \n  5.VOUS ETES MALADE? Appelz votre médecin"

    },

    {

        titre:"TRAITEMENTS MEDICAUX",

        text:"Se vous présentez des symptômes bénins et que vous êtes en bonne santé générale, isolez-vous et contacter un prestataire de santé ou un service d'information téléphonique sur la COVID-19 pour obtenir des conseils. \n Consultez un médecin si vous avez de la fièvre,que vous toussez et que vous avez des difficultés à respirer.Prévenez le service concerné pat téléphone au préalable"

    },

    {

        titre:"SOINS AUTO-ADMINISTRES",

        text:"Si vous pensez être malade,reposez-vous buvez abondamment et consommez des aliments nutritifs.Restez dans une chambre séparée des autres membres de la famille et utilisez une salle de bains différente ,si possible. Nettoyer et désinfecter régulièrement les surfaces que vous touchez. \n  Tous les membres du ménage doivent conserver un mode de vie sain.Maintenez un régime alimentaire adapté ,pratiquez des activités physiques et gardez le contact avec vos proches par téléphone ou sur les réseaux sociaux.Dans les périodes difficiles,les enfants ont particulièrement besoin d'amour et d'attention de la part des adultes.Conserver autant que possible vos habitudes et vos horaires. \n   Il est normal d'être triste , stressé ou troublé durant une période de crise.Cela peut vous aider de parler à des gens de confiance , comme vos amis et les membres de votre famille.Si vous vous sentez dépassé par les évènements parlez-en à des professionnels de la santé ou à un conseiller."

    },

]



let precautions = [

    {

        titre: "Lavez vous fréquemment les mains",

        text: "Se laver fréquemment les mains avec une solution hydroalcoolique ou à l'eau et au savon.\n Pourquoi? Se laver les mains avec une solution hydroalcoolique ou à l'eau et au savon tue le virus s'il est présent vos mains."

    },

    {

        titre:"Evitez les contacts étroits.",

        text: " Maintenir une distance d'au moins 1 mètre avec les autres personnes ,en particulier si elles toussent,éternuent ou ont de la fièvre. \nPourquoi? Lorsqu'une personne infectée par un virus respiratoire,comme la COVID-19,tousse ou éternue,elle projette de petites gouttelettes contenant le virus.Si vous êtes trop près,vous pouvez inhaler le virus."

    },

    {

        titre:"Respectez les règles d'hygiènes",

        text:" Se couvrir la bouche et le nez avec le pli du coude ou avec in mouchoir en cas de toux ou d'éternuement-jeter le mouchoir immédiatement après dans une poubelle ferméee et se laver les mains avce une solution hydroalcoolique ou à l'eau et au savon.\nPourquoi? Se couvir la bouche et le nez en cas de toux ou d'éternuement permet d'éviter la propagation des virus et autres agents pathogènes."

    },

    {

        titre:"Portez un masque",

        text:"Avant de mettre un masque ,se laver les mains avec une solution hydroalcoolique ou à l'eau et au savon.\n Appliquez le masque de façon à recouvrir le nez et la bouche et veillez à l'ajuster au mieux sur votre visage.Lorsque l'on porte un masque ,éviter de le toucher ,chaque fois que l'on touche un masque usagé, se laver les mains à l'aided'une solution hydroalcoolique ou à l'eau et au savon.Lorsqu'il s'humidifie , le remplacer par un nouveau masque et ne pas réutiliser des masques à uasage unique.Pour retirer le masque : l'enlever par derrière(ne pas toucher le devant du masque);le jeter immédiatement dans une poubelle fermée ;se laver les mains avec une solution hydroalcoolique ou à l'eau et au savon."

    },

]



let _precautions = () => {

    return (

        <ScrollView>

            {precautions.map(bloc => (

                <ScrollView>

                    <Text style={styles.titre_container}>{bloc.titre}</Text>

                    <Text>{bloc.text}</Text>

                </ScrollView>

            ))}

        </ScrollView>

    )

}



let _covid19 = () => {

    return (

        <ScrollView>

            {covi19.map(bloc => (

                <ScrollView>

                    <Text style={styles.titre_container}>{bloc.titre}</Text>

                    <Text>{bloc.text}</Text>

                </ScrollView>

            ))}

        </ScrollView>

    )

}



let _autoControle = () => {

    return (

        <View></View>

    )

}



class Covid19 extends React.Component {



    static navigationOptions =  {

        title: 'Covid 19',

    }



    constructor(props) {

        super(props)

        this.state = {

            search: '',

            isLoading: false,

            hasContain: true

        }

    }



    render() {

        let id = this.props.navigation.state.params.id

        return(

            id == 0 ? this._covid19() :

                id == 1 ? this._precautions() : this._autoControle()

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

        justifyContent: 'center',

        alignItems: 'center',

    },

    main_container: {

        flex: 1,

    },

    titre_container:{

        justifyContent: 'center',

        alignItems: 'center',

        marginLeft: 5,

        marginRight: 5,

        height: 30,

        borderColor: '#000000',

        borderWidth: 1,

        paddingLeft: 5

    }



})



const mapStateToProps =  (state) => {

    return {

        user: state.userReducer,

    }

}



export  default  connect(mapStateToProps)(Covid19)


