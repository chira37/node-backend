const Role = require("../models/Role");

const add = async (req, res, next) => {
    try {
        const _role = {
            name: req.body.name,
            description: req.body.description,
            privileges: req.body.privileges,
            updated_date_time: new Date(),
            updated_by: req.body.updated_by,
        };

        const role = new Role(_role);

        const { error } = role.joiValidate(_role);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const result = await role.save();
        res.status(200).json({ success: true, message: "Role added successfully", data: result });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await Role.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            privileges: req.body.privileges,
            updated_date_time: new Date(),
            updated_by: req.body.updated_by,
        });

        if (result) {
            res.status(200).json({ success: true, message: "Role updated successfully", data: result });
        } else {
            const error = new Error("Role not found");
            error.status = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const result = await Role.find();
        res.status(200).json({ success: true, message: "Role data fetched successfully", data: result });
    } catch (error) {
        next(error);
    }
};
const getById = async (req, res) => {
    try {
        const result = await Role.findById(req.params.id);
        res.status(200).json({ success: true, message: "Role data fetched successfully", data: result });
    } catch (error) {
        next(error);
    }
};

const deleteById = async (req, res, next) => {
    try {
        const result = await Role.findByIdAndDelete(req.params.id);

        if (result) {
            res.status(200).json({ success: true, message: "Role deleted successfully", data: {} });
        } else {
            const error = new Error("Role not found");
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
