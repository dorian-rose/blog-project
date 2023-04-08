const express = require("express")
const router = express.Router()
//validation of inputs:
const { check } = require("express-validator");
const { validateInputs } = require("../middleware/inputValidation");
//import functions from controllers
const { getOneAuthEntries, getEntries, getEntry, createEntry, updateEntry, deleteEntry, searchEntry, getNumberOfEntries } = require("../controllers/entriesControllers")

router.get("/entries/:author/:limit/:skip", getOneAuthEntries)
router.get("/all-entries/:limit/:skip", getEntries)
router.get("/entry/:title/:author", getEntry)
router.post("/create/:author", [
    check("title", "The title is obligatory").not().isEmpty(),
    check("content", "The content is obligatory").not().isEmpty(),
    check("extract", "The extract is obligatory").not().isEmpty(),
    check("image", "The image is obligatory").not().isEmpty(),
    check("category", "The category is obligatory").not().isEmpty(),
    validateInputs,
], createEntry)
router.put("/update/:title/:author", [
    check("title", "The title is obligatory").not().isEmpty(),
    check("content", "The content is obligatory").not().isEmpty(),
    check("extract", "The extract is obligatory").not().isEmpty(),
    check("image", "The image is obligatory").not().isEmpty(),
    check("category", "The category is obligatory").not().isEmpty(),
    validateInputs,
], updateEntry)
router.delete("/delete", deleteEntry)
router.get("/search/:search/:limit/:skip", searchEntry)
router.post("/number", getNumberOfEntries)


module.exports = router