const express = require("express");
const categoryController = require("../controllers/categoryController");
const passport = require("passport");
const router = express.Router();

router.get("/", categoryController.getAll);

router.get("/:id", categoryController.getById);

router.delete("/:id", categoryController.deleteById);

router.post("/", categoryController.add);

router.put("/:id", categoryController.update);

module.exports = router;
