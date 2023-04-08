const { validationResult } = require("express-validator");

const validateInputs = (req, res, next) => {
    console.log("validating inputs")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        // res.errors = errors.array();
        return res.status(400).json({
            ok: false,
            errors: errors.array(),
        });
    }
    next();
};

module.exports = { validateInputs };