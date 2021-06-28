const monogoose = require("mongoose");

const postSchema = monogoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = monogoose.model("Posts", postSchema);
