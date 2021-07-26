const Category = require("../models/Category");

const add = async (req, res, next) => {
    try {
        const _category = {
            name: req.body.name,
            description: req.body.description,
            updated_date_time: new Date(),
            updated_by: req.body.updated_by,
        };

        const category = new Category(_category);

        const { error } = category.joiValidate(_category);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const result = await category.save();
        res.status(200).json({ success: true, message: "Category added successfully", data: result });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await Category.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            updated_date_time: new Date(),
            updated_by: req.body.updated_by,
        });

        if (result) {
            res.status(200).json({ success: true, message: "Category updated successfully", data: result });
        } else {
            const error = new Error("Category not found");
            error.status = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const result = await Category.find();
        res.status(200).json({ success: true, message: "Category data fetched successfully", data: result });
    } catch (error) {
        next(error);
    }
};
const getById = async (req, res) => {
    try {
        const result = await Category.findById(req.params.id);
        res.status(200).json({ success: true, message: "Category data fetched successfully", data: result });
    } catch (error) {
        next(error);
    }
};

const deleteById = async (req, res, next) => {
    try {
        const result = await Category.findByIdAndDelete(req.params.id);

        if (result) {
            res.status(200).json({ success: true, message: "Category deleted successfully", data: {} });
        } else {
            const error = new Error("Category not found");
            error.status = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    add,
    update,
    getAll,
    getById,
    deleteById,
};
