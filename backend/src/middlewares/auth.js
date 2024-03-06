const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 16,
  timeCost: 1,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.hashedPassword = hashedPassword;
    delete req.body.password;
    next();
  } catch (err) {
    next(err);
  }
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token == null) {
      throw new Error("Token is missing");
    }
    req.auth = jwt.verify(token, process.env.APP_SECRET);
    next();
  } catch (err) {
    next(err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  hashPassword,
  verifyToken,
  token,
};
