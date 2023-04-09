const express = require("express")
const router = express.Router()
//validation of inputs, using express-validator and middleware created:
const { check } = require("express-validator");
const { validateInputs } = require("../middleware/inputValidation");

//import functions from controllers that routes will direct to 
const { getOneAuthEntries, getEntries, getEntry, createEntry, updateEntry, deleteEntry, searchEntry, getNumberOfEntries } = require("../controllers/entriesControllers")

//route to get all entries from ONE author 
router.get("/entries/:author/:limit/:skip", getOneAuthEntries)
//route to get all entries from all authors
router.get("/all-entries/:limit/:skip", getEntries)
//route to get one entry by author and title
router.get("/entry/:title/:author", getEntry)
//create an entry, POST, new details in body
router.post("/create/:author", [
    check("title", "The title is obligatory").not().isEmpty(),
    check("content", "The content is obligatory").not().isEmpty(),
    check("extract", "The extract is obligatory").not().isEmpty(),
    check("image", "The image is obligatory").not().isEmpty(),
    check("category", "The category is obligatory").not().isEmpty(),
    validateInputs,
], createEntry)
//update an entry, PUT, new details in body
router.put("/update/:title/:author", [
    check("title", "The title is obligatory").not().isEmpty(),
    check("content", "The content is obligatory").not().isEmpty(),
    check("extract", "The extract is obligatory").not().isEmpty(),
    check("image", "The image is obligatory").not().isEmpty(),
    check("category", "The category is obligatory").not().isEmpty(),
    validateInputs,
], updateEntry)
//delete an entry, details of which article in body
router.delete("/delete", deleteEntry)
//search for an entry with a key word or search phrase
router.get("/search/:search/:limit/:skip", searchEntry)
//retrieve number of entries either from one author, all authors or search results
router.post("/number", getNumberOfEntries)


module.exports = router