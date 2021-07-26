const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/User");

passport.use(
    "signup",
    new localStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                const _user = {
                    username,
                    password,
                };
                const user = new User(_user);

                const { error } = user.joiValidate(_user);
                if (error) {
                    throw new Error(error.details[0].message);
                }

                const res = await user.save();
                return done(null, res);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    "signin",
    new localStrategy(
        {
            usernameField: "username",
            passwordField: "password",
        },
        async (username, password, done) => {
            try {
                const user = await User.findOne({ username });

                if (!user) {
                    return done(null, false, { message: "User not found" });
                }

                const validate = await user.isValidPassword(password);
                if (!validate) {
                    return done(null, false, { message: "Wrong Password" });
                }

                return done(null, user, { message: "Logged in Successfully" });
            } catch (error) {
                console.log(error);
                done(null, false, { message: "Internal error: passport authentication" });
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
