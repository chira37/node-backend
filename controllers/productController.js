const Product = require("../models/Product");

const add = async (req, res, next) => {
    try {
        const _product = {
            code: req.body.code,
            name: req.body.name,
            description: req.body.description,
            category_id: req.body.category_id,
            brand_id: req.body.brand_id,
            supplier_id: req.body.supplier_id,
            unit: req.body.unit,
            unit_selling_price: req.body.unit_selling_price,
            unit_buying_price: req.body.unit_buying_price,
            discount_price: req.body.discount_price,
            quantity: req.body.quantity,
            updated_date_time: new Date(),
            updated_by: req.body.updated_by,
        };

        const product = new Product(_product);

        const { error } = product.joiValidate(_product);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const result = await product.save();
        res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res) => {
    try {
        const result = await Product.updateOne(
            { _id: req.params._id },
            {
                $set: {
                    code: req.body.code,
                    name: req.body.name,
                    description: req.body.description,
                    category_id: req.body.category_id,
                    brand_id: req.body.brand_id,
                    supplier_id: req.body.supplier_id,
                    unit: req.body.unit,
                    unit_selling_price: req.body.unit_selling_price,
                    unit_buying_price: req.body.unit_buying_price,
                    discount_price: req.body.discount_price,
                    quantity: req.body.quantity,
                    updated_date_time: new Date(),
                    updated_by: req.body.updated_by,
                },
            }
        );

        if (result.n === 1) {
            res.status(200).json({ message: "Successfully update the post" });
        } else {
            const error = new Error("Failed to update the post");
            throw error;
        }
    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res) => {
    try {
        const result = await Product.find();
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getById = async (req, res) => {
    try {
        const result = await Product.findOne({ postId: req.params.postId });
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteById = async (req, res) => {
    try {
        const result = await Product.deleteOne({ postId: req.params.postId });

        if (result.n === 1) {
            res.status(200).json({ message: "Successfully deleted the post" });
        } else {
            const error = new Error("Faild to delete the post");
            throw error;
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    add,
    update,
    getAll,
    getById,
    deleteById,
};
