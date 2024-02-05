const tables = require("../tables");

// The B
const browse = async (req, res, next) => {
  try {
    const customers = await tables.customers.readAll();

    res.json(customers);
  } catch (err) {
    next(err);
  }
};

// The R
const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await tables.customers.read(id);

    if (customer == null) {
      res.sendStatus(404);
    } else {
      res.json(customer);
    }
  } catch (err) {
    next(err);
  }
};

const readForCalendar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await tables.customers.readForCalendar(id);

    if (customer == null) {
      res.sendStatus(404);
    } else {
      res.json(customer);
    }
  } catch (err) {
    next(err);
  }
};

const readForEventPage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await tables.customers.readForEventPage(id);

    if (customer == null) {
      res.sendStatus(404);
    } else {
      res.json(customer);
    }
  } catch (err) {
    next(err);
  }
};
// The E

const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = req.body;
    const [result] = await tables.customers.update({ id, ...customer });

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
    const customerId = await tables.customers.create(req.body);
    const isEventComplete = await tables.customers.isEventComplete(
      req.body.eventId
    );

    res.json({ id: customerId, isEventComplete });
  } catch (err) {
    next(err);
  }
};

// The D
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await tables.customers.delete(id);

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
  readForEventPage,
  readForCalendar,
  edit,
  add,
  destroy,
};
