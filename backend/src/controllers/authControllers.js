const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const user = await tables.users.readByEmailWithPassword(req.body.email);
    if (user == null) {
      res.status(422).json({ message: "Invalid email or password" });
      return;
    }
    const verified = await argon2.verify(user.hash_password, req.body.password);

    if (verified) {
      delete user.hash_password;
      const token = jwt.sign({ sub: user.id }, process.env.APP_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token, { httpOnly: true });
    } else {
      res.status(422).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};
