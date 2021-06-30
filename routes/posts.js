const express = require("express");
const { model } = require("mongoose");
const { body, validationResult } = require("express-validator");
const postController = require("../controllers/postController");
const postValidator = require("../validators/postValidator");

const router = express.Router();


const Post = require("../models/Post");

router.get("/", postController.getAll);

router.get("/:postId", postController.getById);

router.delete("/:postId", postController.deleteById);

router.post("/", postValidator.add, postController.add);

router.put("/:postId", postController.update);

module.exports = router;
