const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/signup", passport.authenticate("signup", { session: true }), async (req, res, next) => {
    res.json({
        message: "Signup success",
        user: req.user,
    });
});

router.post("/login", async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error("An error occurred.");
                throw error;
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);

                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, process.env.JWT_TOKEN);

                return res.json({ token, ...body });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

module.exports = router;
