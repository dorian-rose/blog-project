const { getAuthEntries, getEntriesAll, getEntryByTitle, createNewEntry, changeEntry, removeEntry, searchForEntry } = require("../models/entriesModels")

const getOneAuthEntries = async (req, res) => {
    let { author, limit, skip } = req.params
    try {
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

const getEntries = async (req, res) => {
    let { limit, skip } = req.params
    try {
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


const getEntry = async (req, res) => {
    const { title, author } = req.params
    try {
        const entry = await getEntryByTitle(title, author)
        if (entry.length == 0) {
            res.status(404).json({ ok: false, msg: "You don't have an article with this title" })
        } else { res.status(200).json({ ok: true, entry }) }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error retrieving entry" })
    }
}

const createEntry = async (req, res) => {
    const body = req.body
    const { author } = req.params
    try {
        await createNewEntry(body, author)
        res.status(201).json({ ok: true })
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error creating entry" })
    }

}
const updateEntry = async (req, res) => {
    const { title, author } = req.params
    const body = req.body
    try {
        await changeEntry(body, author, title)
        res.status(201).json({ ok: true })
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error updating entry" })
    }
}
const deleteEntry = async (req, res) => {
    const { title, author } = req.body
    try {
        await removeEntry(author, title)
        res.status(200).json({ ok: true })
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error deleting entry" })
    }
}

const searchEntry = async (req, res) => {
    const { search, limit, skip } = req.params
    try {
        const entries = await searchForEntry(search, limit, skip)
        if (entries.length == 0) { res.status(404).json({ ok: false, msg: "No results" }) }
        else {
            res.status(200).json({ ok: true, entries })
        }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error returning search results" })
    }
}

module.exports = { getOneAuthEntries, getEntries, getEntry, createEntry, updateEntry, deleteEntry, searchEntry }

