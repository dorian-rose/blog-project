const express = require("express");
const router = express.Router();

const {
    loginUserReader,
    renew,
    getReader,
    loginUserAuthor,
    getAuthor
} = require("../controllers/userControllers");

//route to login user (reader/non-admin)
router.post("/", loginUserReader);
//retrieve details of user (reader/non-admin)
router.post("/verify", getReader);
//route to login user (author, admin)
router.post("/author", loginUserAuthor);
//retrieve details of user (author, admin)
router.post("/author/verify", getAuthor)
//renew jsonWebToken, middleware for validation
router.post("/renew", renew);

module.exports = router;