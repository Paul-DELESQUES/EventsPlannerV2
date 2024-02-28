const tables = require("../tables");

// The B
const browse = async (req, res, next) => {
  try {
    const providers = await tables.providers.readAll();

    res.json(providers);
  } catch (err) {
    next(err);
  }
};

// The R
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const provider = await tables.providers.read(id);

    if (provider == null) {
      res.sendStatus(404);
    } else {
      res.json(provider);
    }
  } catch (err) {
    next(err);
  }
};

// The E

const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const provider = req.body;
    const [result] = await tables.providers.update({ id, ...provider });

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
  try {
    const providerId = await tables.providers.create(req.body);
    res.json(providerId);
  } catch (err) {
    next(err);
  }
};

// The D
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await tables.providers.delete(id);

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
