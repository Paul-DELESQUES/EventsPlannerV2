const express = require("express");

const router = express.Router();

const { hashPassword } = require("./middlewares/auth");

// Import itemControllers module for handling item-related operations
const eventControllers = require("./controllers/eventControllers");
const customerControllers = require("./controllers/customerControllers");
const providerControllers = require("./controllers/providerControllers");
const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");

//users

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.get("/auth", authControllers.checkAuth);
router.post("/users/register", hashPassword, userControllers.add);
router.post("/users/login", authControllers.login);
router.post("/users/logout", authControllers.logout);
router.delete("/users/:id", userControllers.destroy);

/* ************************************************************************* */

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

router.get("/providers", providerControllers.browse);
router.get("/providers/:id", providerControllers.read);
router.post("/providers", providerControllers.add);
router.put("/providers/:id", providerControllers.edit);
router.delete("/providers/:id", providerControllers.destroy);

/* ************************************************************************* */

module.exports = router;
