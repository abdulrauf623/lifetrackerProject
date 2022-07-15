const {Client} = require("pg")

const {getDatabaseUrl} = require("../lifetracker-api/config")

const db = new Client({connectionString: getDatabaseUrl()})

require("colors")




db.connect((err) => {

    if (err){
        console.error("connection error".red, err.stack)
    }
    else{

        console.log("Successfully connected to Postgress Database!".blue)
    }



     
})


module.exports = db
