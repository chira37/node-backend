const Post = require("../models/Post");

const add = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });

    try {
        const result = await post.save();
        res.status(200).json({ data: result });
    } catch (error) {
        res.status.send("error");
    }
};

const getAll = async (req, res) => {
    try {
        const result = await Post.find();
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(500).send("error");
    }
};
const getById = async (req, res) => {
    try {
        const result = await Post.findById(req.params.postId);
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(500).send("error");
    }
};

const deleteById = async (req, res) => {
    try {
        const result = await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(500).send("error");
    }
};

module.exports = {
    add,
    getAll,
    getById,
    deleteById
};
