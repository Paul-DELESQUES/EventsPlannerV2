const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password);
    req.body.hashPassword = hashedPassword;
    delete req.body.password;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  hashPassword,
};
