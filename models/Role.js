const mongoose = require("mongoose");
var Joi = require("joi");

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    description: String,
    privileges: Array,
    updated_date_time: Date,
    updated_by: String,
});

roleSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
        next(new Error("Role name already used"));
    } else {
        next();
    }
});

roleSchema.methods.joiValidate = function (obj) {
    var schema = Joi.object({
        name: Joi.string().max(40).required(),
        description: Joi.string().max(200),
        privileges: Joi.array(),
        updated_date_time: Joi.date().required(),
        updated_by: Joi.string().required(),
    });
    return schema.validate(obj);
};

module.exports = mongoose.model("role", roleSchema);
