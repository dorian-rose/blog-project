const express = require("express")
const router = express.Router()

const { getOneAuthEntries, getEntries, getEntry, createEntry, updateEntry, deleteEntry, searchEntry } = require("../controllers/entriesControllers")

router.get("/entries/:author/:limit/:skip", getOneAuthEntries)
router.get("/all-entries/:limit/:skip", getEntries)
router.get("/entry/:title/:author", getEntry)
router.post("/create/:author", createEntry)
router.put("/update/:title/:author", updateEntry)
router.delete("/delete", deleteEntry)
router.get("/search/:search/:limit/:skip", searchEntry)


module.exports = router