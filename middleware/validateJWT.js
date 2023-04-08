const jwt = require("jsonwebtoken");

const validateJwt = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(400).json({
      ok: false,
      msg: "No token in request, access not possible",
    });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.id = payload.uid;
    req.name = payload.userName;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token not valid",
    });
  }
  next();
};

module.exports = { validateJwt };
