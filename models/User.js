const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var Joi = require("joi");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    first_name: String,
    last_name: String,
    phone: String,
    address: String,
    role_id: {
        type: String,
    },
});

userSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

userSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
        next(new Error("Username/Email already used"));
    } else {
        next();
    }
});

userSchema.methods.isValidPassword = async function (password) {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
};

// userSchema.methods.isUsernameAvailable = async function (username) {
//     const res = await mongoose.model("user").findOne({ username: username });
//     if (res) return false;
//     else return true;
// };

userSchema.methods.joiValidate = function (obj) {
    var schema = Joi.object({
        username: Joi.string().min(4).max(30).required(),
        email: Joi.string().email().optional(),
        password: Joi.string().min(6).max(30).required(),
        first_name: Joi.string(),
        last_name: Joi.string(),
        phone: Joi.number(),
        address: Joi.string(),
        role_id: Joi.string(),
    });
    return schema.validate(obj);
};

module.exports = mongoose.model("user", userSchema);
