const express = require("express");
const productController = require("../controllers/productController");
const passport = require("passport");
const router = express.Router();

router.get("/", productController.getAll);

router.get("/:postId", productController.getById);

router.delete("/:postId", passport.authenticate("jwt", { session: false }), productController.deleteById);

router.post("/", passport.authenticate("jwt", { session: false }), productController.add);

router.put("/:postId", passport.authenticate("jwt", { session: false }), productController.update);

module.exports = router;
