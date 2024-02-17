const express = require("express");

const router = express.Router();

// Import itemControllers module for handling item-related operations
const eventControllers = require("./controllers/eventControllers");
const customerControllers = require("./controllers/customerControllers");
const todolistControllers = require("./controllers/todolistControllers");

router.get("/events", eventControllers.browse);
router.post("/events", eventControllers.addEvents);
router.delete("/eventspage/:id", eventControllers.destroy);

/* ************************************************************************* */

router.get("/customers", customerControllers.browse);
router.get("/customers/:id", customerControllers.read);
router.get("/customerslist", customerControllers.readForCustomersList);
router.get("/eventspage", customerControllers.readForEventPage);
router.get("/calendar", customerControllers.readForCalendar);
router.post("/customers", customerControllers.add);

/* ************************************************************************* */

router.get("/todolists", todolistControllers.browse);
router.get("/todolists/:id", todolistControllers.read);
router.post("/todolists", todolistControllers.add);
router.put("/todolists/:id", todolistControllers.edit);
router.delete("/todolists/:id", todolistControllers.destroy);

/* ************************************************************************* */

module.exports = router;
