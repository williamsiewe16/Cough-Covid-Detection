import SQLite  from 'react-native-sqlite-storage'

const database_name = "covid-app.db";
const database_version = "1.0";
const database_displayname = "covid-app";
const database_size = 200000;

let errorCB = (err) => {
    console.log("SQL Error: " + err);
}

let successCB = () => {
    console.log("SQL executed fine");
}

let openCB = () => {
    console.log("Database OPENED");
}

let db = SQLite.openDatabase(database_name,database_version,database_displayname,database_size,openCB,errorCB)


module.exports = {

    createAll: () => {
        db.transaction((tx) => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS Contacts (id integer primary key autoincrement,wApp varchar(200),image varchar(200));",
                [],
                (tx,results) => {
                    tx.executeSql("CREATE TABLE IF NOT EXISTS Messages (id integer primary key autoincrement, emetteur varchar(200), id_destinateur varchar(200), intitule varchar(200), heure varchar(200));",
                        [],
                        (tx,results) => {
                            tx.executeSql("CREATE TABLE IF NOT EXISTS Discussions (id integer primary key autoincrement, id_contact integer);",
                                [],
                                (tx,results) => {
                                console.log("tables created")
                                })
                        })
                })
        })
    },
    drop: () => {
        db.transaction((tx) => {
            tx.executeSql("DROP DATABASE IF EXISTS siewapp;",
                [],
                (tx,results) => console.log(results))
        })
    },


}
