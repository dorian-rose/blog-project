const jwt = require("jsonwebtoken");

const generateJwt = (email, userName) => {
    return new Promise((resolve, reject) => {
        let payload = { email, userName };
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: "3h" },
            (error, token) => {
                if (error) {
                    console.log(error);
                    reject("error generating token");
                }
                resolve(token);
            }
        );
    });
};

module.exports = {
    generateJwt,
};
