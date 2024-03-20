const tables = require("../tables");

// The B
const browse = async (req, res, next) => {
  try {
    const events = await tables.events.readAll();

    res.json(events);
  } catch (err) {
    next(err);
  }
};

// The R
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await tables.events.read(id);

    if (event == null) {
      res.sendStatus(404);
    } else {
      res.json(event);
    }
  } catch (err) {
    next(err);
  }
};

// The E

const edit = async (req, res, next) => {
  const event = req.body;
  const { id } = req.params;

  console.log("ID:", id);
  console.log("Event data:", event);
  try {
    const [result] = await tables.events.update({ ...event, id });

    console.log("Update result:", result);

    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error("Error in edit function:", err);
    res.sendStatus(500);
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const event = req.body;

  try {
    const insertId = await tables.events.create(event);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const addEvents = async (req, res, next) => {
  try {
    const eventId = await tables.events.createEvent(req.body);

    res.json({ id: eventId });
  } catch (err) {
    next(err);
  }
};

// The D
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await tables.events.delete(id);

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
  addEvents,
  destroy,
};
