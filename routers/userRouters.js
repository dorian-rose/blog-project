const express = require("express");
const router = express.Router();
const { validateJwt } = require("../middleware/validateJWT");
const {
    loginUserReader,
    renew,
    getReader,
    loginUserAuthor,
    getAuthor
} = require("../controllers/userControllers");

router.post("/", loginUserReader);
router.post("/verify", getReader);
router.post("/author", loginUserAuthor);
router.post("/author/verify", getAuthor)
router.get("/renew", validateJwt, renew);

module.exports = router;