const Post = require("../models/Post");

const add = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        userName: req.body.userName,
        postId: req.body.postId,
    });

    try {
        const result = await post.save();
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const result = await Post.updateOne(
            { postId: req.params.postId },
            { $set: { title: req.body.title, description: req.body.description } }
        );
        if (result.n === 1) {
            res.status(200).json({ message: "Successfully update the post" });
        } else {
            res.status(400).json({ message: "Faild to update the post" });
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const result = await Post.find();
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getById = async (req, res) => {
    try {
        const result = await Post.findOne({ postId: req.params.postId });
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteById = async (req, res) => {
    try {
        const result = await Post.deleteOne({ postId: req.params.postId });

        if (result.n === 1) {
            res.status(200).json({ message: "Successfully deleted the post" });
        } else {
            res.status(400).json({ message: "Faild to delete the post" });
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
