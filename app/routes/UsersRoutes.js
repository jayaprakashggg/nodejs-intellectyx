var express = require("express");
var router = express.Router();
var UsersController = require("../controllers/UsersController");

/*
 * GET
 */
router.get("/", UsersController.list);

/*
 * GET
 */
router.get("/:id", UsersController.show);

/*
 * GET
 */
router.get("/search/:search", UsersController.searchByName);

/*
 * POST
 */
router.post("/", UsersController.create);

/*
 * PUT
 */
router.put("/:id", UsersController.update);

/*
 * DELETE
 */
router.delete("/:id", UsersController.remove);

module.exports = router;
