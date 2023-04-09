const { getAuthEntries, getEntriesAll, getEntryByTitle, createNewEntry, changeEntry, removeEntry, searchForEntry, getNumberEntries } = require("../models/entriesModels")

//retrieve details of all entries from one author (by author email)
const getOneAuthEntries = async (req, res) => {
    let { author, limit, skip } = req.params
    try {
        //call to entriesModels
        const entries = await getAuthEntries(author, limit, skip)
        if (entries.length == 0) {
            return res.status(404).json({ ok: false, msg: "You have no entries" })
        } else {
            return res.status(200).json({
                ok: true,
                entries
            })
        }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error retrieving entries" })
    }
}

//retrieve details of all entries from all authors.
const getEntries = async (req, res) => {
    let { limit, skip } = req.params
    try {
        //call to entriesModels
        const entries = await getEntriesAll(limit, skip)
        if (entries.length == 0) {
            return res.status(404).json({ ok: false, msg: "No entries available" })
        } else {
            return res.status(200).json({
                ok: true,
                entries
            })
        }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error retrieving entries" })
    }
}

//get all details of one entry, by title and author 
const getEntry = async (req, res) => {
    const { title, author } = req.params
    try {
        //call to entriesModels
        const entry = await getEntryByTitle(title, author)
        if (entry.length == 0) {
            res.status(404).json({ ok: false, msg: "Unable to retrieve this article" })
        } else { res.status(200).json({ ok: true, entry }) }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error retrieving entry" })
    }
}

//create an entry and asign an author
const createEntry = async (req, res) => {
    const body = req.body
    const { author } = req.params
    try {
        //call to entriesModels
        const entry = await getEntryByTitle(body.title, author)
        if (entry.length) {
            res.status(500).json({ ok: false, errors: [{ msg: "You already have an article with this title" }] })
        } else {
            await createNewEntry(body, author)
            res.status(201).json({ ok: true })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, errors: [{ msg: "Error creating entry" }] })
    }

}
//update an existig entry
const updateEntry = async (req, res) => {
    const { title, author } = req.params
    const body = req.body
    try {
        //call to entriesModels to find title of article to be changed
        const entry = await getEntryByTitle(body.title, author)

        if (entry.length == 0) { //entry doesn't exist
            res.status(500).json({ ok: false, errors: [{ msg: "This article doesn't exist" }] })
        } else {
            //if entry exists, call to entriesModels to update columns
            await changeEntry(body, author, title)
            res.status(201).json({ ok: true })
        }
    } catch (error) {
        res.status(500).json({ ok: false, errors: [{ msg: "Error creating entry" }] })
    }
}
const deleteEntry = async (req, res) => {
    const { title, author } = req.body
    try {
        //call to entriesModels
        await removeEntry(author, title)
        res.status(200).json({ ok: true })
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error deleting entry" })
    }
}

const searchEntry = async (req, res) => {
    const { search, limit, skip } = req.params
    try {
        //call to entriesModels
        const entries = await searchForEntry(search, limit, skip)
        if (entries.length == 0) { res.status(404).json({ ok: false, msg: "No results" }) }
        else {
            res.status(200).json({ ok: true, entries })
        }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error returning search results" })
    }
}

const getNumberOfEntries = async (req, res) => {
    const email = req.body.email
    const search = req.body.search
    let numEntries;
    try {
        if (email) {
            numEntries = await getNumberEntries(email)
        } else if (search) {
            numEntries = await getNumberEntries(null, search)
        } else {
            numEntries = await getNumberEntries()
        }
        if (numEntries == 0) { res.status(404).json({ ok: false, msg: "No Entries" }) }
        else {
            res.status(200).json({ ok: true, numEntries })
        }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error returning number of entries" })
    }
}

module.exports = { getOneAuthEntries, getEntries, getEntry, createEntry, updateEntry, deleteEntry, searchEntry, getNumberOfEntries }

