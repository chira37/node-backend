const express = require("express");
const { model } = require("mongoose");
const passport = require("passport");
const { body, validationResult } = require("express-validator");
const postController = require("../controllers/postController");
const postValidator = require("../validators/postValidator");

const router = express.Router();

const Post = require("../models/Post");

router.get("/", postController.getAll);

router.get("/:postId", postController.getById);

router.delete("/:postId", passport.authenticate("jwt", { session: false }), postController.deleteById);

router.post("/", passport.authenticate("jwt", { session: false }), postController.add);

router.put("/:postId", passport.authenticate("jwt", { session: false }), postController.update);

module.exports = router;
