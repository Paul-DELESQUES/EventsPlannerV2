const express = require("express");

const router = express.Router();

// Import Controllers module
const itemControllers = require("./controllers/itemControllers");

// Routes for item-related operations

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.post("/items", itemControllers.add);

/* ************************************************************************* */

module.exports = router;
