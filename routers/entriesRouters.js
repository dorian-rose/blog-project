const express = require("express")
const router = express.Router()

const { getAllEntries, getEntry, createEntry, updateEntry, deleteEntry, searchEntry } = require("../controllers/entriesControllers")

router.get("/entries/:author/:limit/:skip", getAllEntries)
router.get("/entry/:title/:author", getEntry)
router.post("/create/:author", createEntry)
router.put("/update/:title/:author", updateEntry)
router.delete("/delete", deleteEntry)
router.get("/search/:search/:author/:limit/:skip", searchEntry)


module.exports = router