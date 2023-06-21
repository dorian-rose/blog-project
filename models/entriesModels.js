/**
 * 
 */

const { Pool } = require("pg")

//import queries from queries.js to access commands stored there
const queries = require("./queries")

//configure connection to db in local
const pool = new Pool({
    host: process.env.ELEPHANT_HOST,
    user: process.env.ELEPHANT_USER,
    database: process.env.ELEPHANT_DB,
    password: "G2XNalDLbGL7V69udqZipy0lErcXt3_D",
})

//get all entries by author
/**
 * 
 * @param {String} email user email
 * @param {Number} limit number of entries per page
 * @param {Number} skip number of entries to skip before first entry
 * @returns {array}
 * @throws {error}
 */
const getAuthEntries = async (email, limit, skip) => {
    let client, result;
    try {
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
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
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
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
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
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
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
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
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
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
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
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
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
        data = await client.query(queries.searchEntries, [`%${search}%`, limit, skip])
        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}

const getNumberEntries = async (email, search) => {
    let client, result;
    try {
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js, command used will depend on argument received from entriesController
        if (email) {
            data = await client.query(queries.getNumEntriesPerAuth, [email])
            result = data.rows
        } else if (search) {
            data = await client.query(queries.getNumEntriesSearch, [`%${search}%`])
            result = data.rows
        } else {
            data = await client.query(queries.getNumEntries)
            result = data.rows
        }
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}


module.exports = { getAuthEntries, getEntriesAll, getEntryByTitle, createNewEntry, changeEntry, removeEntry, searchForEntry, getNumberEntries }