import axios from "axios"
import {AntDesign, FontAwesome5} from "@expo/vector-icons";
import React from "react";
import fs from "react-native-fs"
import {Platform} from "react-native";

/** corona lmao ninja api */
const lmaoAPI = "https://corona.lmao.ninja/v3/covid-19"

/** efro-vid api (node.js) */
const efroVidAPI = "https://efrovid.herokuapp.com/api" // "http://192.168.1.84:6000/api"

/** cough on covid api (flask) */
const cocAPI = /*"http://192.168.1.84:9100"*/ "http://10.3.4.44:9100"


let apiCalls = {
    getWorldWideData: () => {
        return axios.get(`${lmaoAPI}/all`)
            .then(response => {
                let data = response.data
                Object.keys(data).forEach(key => {
                    data[key] = data[key].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                })
                return data
            })
    },
    getCountryData: (country) => {
        return axios.get(`${lmaoAPI}/countries/${country}`)
            .then(response => {
                let data = response.data
                Object.keys(data).forEach(key => {
                    data[key] = data[key].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                })
                return data
            })
    },
    searchCountries: (text) => {
        return axios.get(`${efroVidAPI}/countries/search?text=${text}`)
            .then(response => response.data)
    },

    getArticles: (text) => {
        console.log("hey")
        return axios.get(`${efroVidAPI}/news/search?text=${text}`)
            .then(response => response.data)
    },

    getPrediction: async (filename) => {
        let path = fs.ExternalStorageDirectoryPath+`/Cough On Covid/Media/${filename}.wav`
        path = Platform.OS == "android" ? "file://"+path : path
        const formData = new FormData()
        formData.append('file', {
            uri: path,
            name: `${filename}.wav`,
            type: 'audio/wav',
        })
        try {
            const res = await fetch(`${cocAPI}/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                },
                body: formData,
            })
            const json = await res.json()
            return json
        } catch (err) {
            alert(err)
        }

    }
}

export default apiCalls
