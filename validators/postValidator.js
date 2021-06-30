const { body } = require("express-validator/check");

const add = [body("userName").notEmpty(), body("title").notEmpty(), body("description").notEmpty()];

module.exports = {
    add,
};
