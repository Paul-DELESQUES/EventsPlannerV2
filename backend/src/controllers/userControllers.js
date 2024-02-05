const tables = require("../tables");

// The B
const browse = async (req, res, next) => {
  try {
    const users = await tables.users.readAll();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

// The R
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await tables.users.read(id);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

// The E

const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const [result] = await tables.users.update({ id, ...user });

    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.sendStatus(500);
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const user = req.body;

  try {
    const insertId = await tables.users.create(user);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// The D
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await tables.users.delete(id);

    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.sendStatus(500);
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
