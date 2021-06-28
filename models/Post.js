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
    userName: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = monogoose.model("Posts", postSchema);
