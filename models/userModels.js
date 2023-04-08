const { Pool } = require("pg")
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
        client = await pool.connect()
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