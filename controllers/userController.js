const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const signup = async (req, res, next) => {
    res.json({
        message: "Signup success",
        user: req.user,
    });
};

const signin = async (req, res, next) => {
    passport.authenticate("signin", async (error, user, info) => {
        try {
            if (error || !user) {
                console.log(error);
                throw new Error(info?.message);
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);

                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, process.env.JWT_TOKEN);

                return res.json({ token, user: { ...body } });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
};

const add = async (req, res, next) => {
    try {
        const _user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            address: req.body.address,
            role_id: req.body.role_id,
        };

        const user = new User(_user);
        const { error } = user.joiValidate(_user);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const result = await user.save();
        res.status(200).json({ success: true, message: "User added successfully", data: result });

        res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signup,
    signin,
    add,
};
