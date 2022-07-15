require("dotenv").config()
require("colors")

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001


const SECRET_KEY = process.env.SECRET_KEY


function getDatabaseUrl(){
const dbUser = process.env.DATABASE_USER || "postgres"

const dbPass = process.env.DATABASE_PASS ? encodeURI (process.env.DATABASE_PASS) : "postgres"

const dbHost = process.env.DATABASE_HOST || "localhost"

const dbPort = process.env.DATABASE_PORT || 5432

const dbName = process.env.DATABASE_NAME || "lifetracker"




return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`



}


const BCRYPT_WORK_FACTOR = 13




console.log("Life Tracker Registration Config:".green)

console.log("PORT:".blue, PORT)

console.log("DATABASE URL:".green, getDatabaseUrl())

console.log("---")


module.exports = {


    PORT, 
    BCRYPT_WORK_FACTOR,
    getDatabaseUrl,
    SECRET_KEY

}
