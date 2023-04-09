//import Pool from postgres
const { Pool } = require("pg")

//import queries from queries.js to access commands stored there
const queries = require("./queries")

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    database: "blog",
    password: "admin"
})



const getUserReader = async (email) => {
    let client, result;
    try {
        //connect to db
        client = await pool.connect()
        //collect command from queries.js and call to db
        const data = await client.query(queries.getUserReader, [email])
        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}

const getUserAuthor = async (email) => {
    let client, result;
    try {
        client = await pool.connect()
        const data = await client.query(queries.getUserAuthor, [email])
        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}
module.exports = { getUserReader, getUserAuthor }