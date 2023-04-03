const { Pool } = require("pg")
const queries = require("./queries")

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    database: "blog",
    password: "admin"
})

//get all entries by author
const getAuthEntries = async (email, limit, skip) => {
    let client, result;
    try {
        client = await pool.connect()
        const data = await client.query(queries.getAllAuthEntries, [email, limit, skip])
        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }

    return result
}

const getEntriesAll = async (limit, skip) => {
    let client, result;
    try {
        client = await pool.connect()
        const data = await client.query(queries.getAllEntries, [limit, skip])
        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }

    return result
}

const getEntryByTitle = async (title, author) => {
    let client, result;
    try {
        client = await pool.connect()
        const data = await client.query(queries.getEntry, [title, author])
        result = data.rows

    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}

const createNewEntry = async (body, email) => {
    let client, result;
    try {
        client = await pool.connect()
        result = await client.query(queries.createEntry, [body.title, body.content, body.extract, body.image, email, body.category])
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}

const changeEntry = async (body, email, title) => {
    let client, result;
    try {
        client = await pool.connect()
        result = await client.query(queries.updateEntries, [body.title, body.content, body.extract, body.image, email, body.category, title])
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}
const removeEntry = async (email, title) => {
    let client, result;
    try {
        client = await pool.connect()
        result = await client.query(queries.deleteEntries, [title, email])
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}
const searchForEntry = async (search, limit, skip) => {
    let client, result;
    try {
        client = await pool.connect()
        data = await client.query(queries.searchEntries, [`%${search}%`, limit, skip])
        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}
module.exports = { getAuthEntries, getEntriesAll, getEntryByTitle, createNewEntry, changeEntry, removeEntry, searchForEntry }