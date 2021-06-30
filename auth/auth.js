const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/User");

passport.use(
    "signup",
    new localStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                const user = await User.create({ email, password, userName: req.body.userName });
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    "login",
    new localStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });

                if (!user) {
                    return done(null, false, { message: "User not found" });
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: "Wrong Password" });
                }

                return done(null, user, { message: "Logged in Successfully" });
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_TOKEN,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);
