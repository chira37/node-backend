const express = require("express");
const roleController = require("../controllers/roleController");
const passport = require("passport");
const router = express.Router();

router.get("/", roleController.getAll);

router.get("/:id", roleController.getById);

router.delete("/:id", roleController.deleteById);

router.post("/", roleController.add);

router.put("/:id", roleController.update);

module.exports = router;
