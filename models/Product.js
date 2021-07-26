const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var Joi = require("joi");

const productSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
    },
    name: String,
    description: String,
    category_id: String,
    brand_id: String,
    supplier_id: String,
    unit: String,
    unit_selling_price: Number,
    unit_buying_price: Number,
    discount_price: Number,
    quantity: Number,
    updated_date_time: Date,
    updated_by: String,
});

productSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

// productSchema.methods.isIdAvailable = async function (product_id) {
//     const res = await mongoose.model("product").findOne({ product_id: product_id });
//     if (res) return false;
//     else return true;
// };

productSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
        next(new Error("Product code already used"));
    } else {
        next();
    }
});

productSchema.methods.joiValidate = function (obj) {
    var schema = Joi.object({
        code: Joi.string().min(3).max(10).required(),
        name: Joi.string().max(30).required(),
        description: Joi.string().required(),
        category_id: Joi.string().required(),
        brand_id: Joi.string().required(),
        supplier_id: Joi.string().required(),
        unit: Joi.string().required(),
        unit_selling_price: Joi.number().min(0).required(),
        unit_buying_price: Joi.number().min(0).required(),
        discount_price: Joi.number().min(0),
        quantity: Joi.number().min(0).required(),
        updated_date_time: Joi.date().required(),
        updated_by: Joi.string().required(),
    });
    return schema.validate(obj);
};

module.exports = mongoose.model("product", productSchema);
