const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const postController = require("../controllers/postController");

const Post = require("../models/Post");

router.get("/", postController.getAll);

router.get("/:postId", postController.getById);

router.delete("/:postId", postController.deleteById);

router.post("/", postController.add);

module.exports = router;
