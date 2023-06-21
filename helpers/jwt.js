const jwt = require("jsonwebtoken");

//generate new token using jsonWebToken
//receive arguments from where called in login or renew
const generateJwt = (email, userName) => {
    return new Promise((resolve, reject) => {
        let user = { email };
        jwt.sign(
            user,
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" },
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
