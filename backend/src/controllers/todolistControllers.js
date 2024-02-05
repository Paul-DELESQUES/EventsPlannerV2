const tables = require("../tables");

// The B
const browse = async (req, res, next) => {
  try {
    const todolist = await tables.todolist.readAll();

    res.json(todolist);
  } catch (err) {
    next(err);
  }
};

// The R
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todolist = await tables.todolist.read(id);

    if (todolist == null) {
      res.sendStatus(404);
    } else {
      res.json(todolist);
    }
  } catch (err) {
    next(err);
  }
};

// The E

const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todolist = req.body;
    const [result] = await tables.todolist.update({ id, ...todolist });

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
  const todolist = req.body;

  try {
    const insertId = await tables.todolist.create(todolist);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// The D
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await tables.todolist.delete(id);

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
