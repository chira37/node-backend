const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var Joi = require("joi");
const { string } = require("joi");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    description: String,
    updated_date_time: Date,
    updated_by: String,
});

categorySchema.post("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
        next(new Error("Category name already used"));
    } else {
        next();
    }
});

categorySchema.methods.joiValidate = function (obj) {
    var schema = Joi.object({
        name: Joi.string().max(40).required(),
        description: Joi.string().max(200),
        updated_date_time: Joi.date().required(),
        updated_by: Joi.string().required(),
    });
    return schema.validate(obj);
};

module.exports = mongoose.model("category", categorySchema);
