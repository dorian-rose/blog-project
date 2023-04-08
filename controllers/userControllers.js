
const bcrypt = require("bcryptjs");
const { generateJwt } = require("../helpers/jwt");
const { getUserReader, getUserAuthor } = require("../models/userModels")

//retrieve user from reader list
const getReader = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await getUserReader(email)

        res.status(200).json({
            ok: true,
            email: user[0].email,
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Unable to verify user",
        });
    }
}

//retrieve user from author list
const getAuthor = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await getUserAuthor(email)
        console.log("user", user[0].email)

        res.status(200).json({
            ok: true,
            email: user[0].email,
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Unable to verify user",
        });
    }
}

//login user reader (not admin)
const loginUserReader = async (req, res) => {
    //retrieve reader details to see if exists
    try {
        const { email, password } = req.body;
        const user = await getUserReader(email)

        if (user.length == 0) {
            console.log("user doesn't exist")
            return res.status(404).json({
                ok: false,
                msg: "User with this email doesn't exist",
            });
        }

        //compare password entered at login with encyrpted password stored in DB
        let salt = bcrypt.genSaltSync(10);
        const passwordEnc = bcrypt.hashSync(user[0].password, salt);//este paso no tiene sentido - normalmente la contraseña seria encriptada al registrar usuario. Lo hago aqui para practicar con bcrypt

        const passwordMatch = bcrypt.compareSync(password, passwordEnc); // true


        //if password is not a match in step above, return error
        if (!passwordMatch) {
            console.log("password doesn't match")
            return res.status(400).json({
                ok: false,
                passwordMatch,
                msg: "Password incorrect",
            });
        }
        //if password a match, generate token and return favourable res status
        const token = await generateJwt(user[0].email, user[0].fullname);

        return res.status(200).json({
            ok: true,
            passwordMatch,
            msg: "User retrieved",
            data: user,
            token,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error retrieving user, contact administrator",
        });
    }
};

//login user author (admin)
const loginUserAuthor = async (req, res) => {
    //retrieve reader details to see if exists
    try {
        const { email, password } = req.body;

        const user = await getUserAuthor(email)

        if (user.length == 0) {
            console.log("user doesn't exist")
            return res.status(404).json({
                ok: false,
                msg: "User with this email doesn't exist",
            });
        }

        //compare password entered at login with encyrpted password stored in DB
        let salt = bcrypt.genSaltSync(10);
        const passwordEnc = bcrypt.hashSync(user[0].password, salt);//este paso no tiene sentido - normalmente la contraseña seria encriptada al registrar usuario. Lo hago aqui para practicar con bcrypt

        const passwordMatch = bcrypt.compareSync(password, passwordEnc); // true

        //if password is not a match in step above, return error
        if (!passwordMatch) {
            console.log("password doesn't match")
            return res.status(400).json({
                ok: false,
                passwordMatch,
                msg: "Password incorrect",
            });
        }

        //if password a match, generate token and return favourable res status
        const token = await generateJwt(user[0].email, user[0].fullname);

        return res.status(200).json({
            ok: true,
            passwordMatch,
            msg: "User retrieved",
            data: user,
            token,
        });
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error retrieving user, contact administrator",
        });
    }
};

//renew token
const renew = async (req, res) => {
    const { id, name } = req;
    const token = await generateJwt(id, name);
    return res.status(200).json({
        ok: true,
        msg: "webtoken renewed",
        token,
    });
};

module.exports = { getReader, loginUserReader, renew, getAuthor, loginUserAuthor };