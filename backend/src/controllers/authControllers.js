const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const user = await tables.users.readByEmailWithPassword(req.body.email);
    if (user === null) {
      res.status(422).json({ message: "Invalid email or password" });
      return;
    }
    const verified = await argon2.verify(user.hash_password, req.body.password);

    if (verified) {
      delete user.hash_password;
      const token = jwt.sign({ id: user.id }, process.env.APP_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("user_token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 3600000,
      });
      res.json(user);
    } else {
      res.status(422).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  res
    .clearCookie("token", { httpOnly: true, path: "/", maxAge: 0 })
    .sendStatus(200);
};

const checkAuth = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ isAuthenticated: false });
    }

    jwt.verify(token, process.env.APP_SECRET, (err) => {
      if (err) {
        return res.json({ isAuthenticated: false });
      } else {
        return res.json({ isAuthenticated: true });
      }
    });
  } catch (err) {
    return res.json({ isAuthenticated: false });
  }
};

module.exports = {
  checkAuth,
  login,
  logout,
};
