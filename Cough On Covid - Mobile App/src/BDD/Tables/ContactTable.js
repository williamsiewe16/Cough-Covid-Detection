import SQLite  from 'react-native-sqlite-storage'

const database_name = "siewapp.db";
const database_version = "1.0";
const database_displayname = "siewapp";
const database_size = 200000;
const TABLE_NAME = "Contacts"


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
let createRequest = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (id integer primary key autoincrement,name varchar(200),image varchar(200));`

module.exports = {

    //Créer la table
    create: () => {
        db.transaction((tx) => {
            tx.executeSql(createRequest,
                [],
                (tx,results) => console.log("table created"))
        })
    },

    //Supprimer la table
    drop: () => {
        db.transaction((tx) => {
            tx.executeSql("DROP TABLE IF EXISTS "+TABLE_NAME+";",
                [],
                (tx,results) => console.log("table dropped"))
        })
    },

    //Insérer un élément dans la table
    save: (data,callback) => {
        db.transaction((tx) => {
            tx.executeSql("INSERT INTO "+TABLE_NAME+" (name,image) values (?,'1');",
                [data.name],
                (tx,results) => {
                    callback(results)
                })
        })
    },

    //Mettre à jour la table
    updatePP: (data,callback) => {
        db.transaction((tx) => {
            tx.executeSql("UPDATE " + TABLE_NAME + " set image = ? WHERE id = ?",
                [data.image,data.id],
                (tx, results) => {})
        })
    },

    //Sélectionner les éléments de la table
    selectAll: (data) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM "+TABLE_NAME,
                [],
                (tx,results) => {
                    let values = []
                    for(let i=0; i<results.rows.length;i++){
                        values.push(results.rows.item(i))
                    }
                    console.log(values)
                    console.log(results.rows.length)
                })
        })
    },

    //Mettre à jour la table
    update: () => {},

    //Supprimer un élément de la table
    delete: (data) => {
        db.transaction((tx) => {
            tx.executeSql("DELETE FROM "+TABLE_NAME+" where name = ?",
                [data.name],
                (tx,results) => {
                    console.log('Element deleted')
                })
        })
    },

    //Vider la table
    truncate: () => {
        db.transaction((tx) => {
            tx.executeSql("DELETE FROM "+TABLE_NAME+" where 1",
                [],
                (tx,results) => {
                    console.log('table truncated')
                })
        })
    },
    request: (req,callback) => {
        db.transaction((tx) => {
            tx.executeSql(req,
                [],
                (tx,results) => {
                    callback(results)
                }, (tx,error) => { console.log(tx.message) })
        })
    },

    migrate: () => {
        db.transaction((tx) => {
            tx.executeSql("DROP TABLE IF EXISTS "+TABLE_NAME+";",
                [],
                (tx,results) =>{
                    tx.executeSql(createRequest,
                        [],
                        (tx,results) => {
                            console.log("migration done")
                        },(tx) => { console.log(tx) })
                })
        })
    }


}
