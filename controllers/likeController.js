//import models
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

//like a post
exports.likePost = async (req, res) => {
    try {
        const { post } = req.body;
        const user = req.user.id;
        // Prevent duplicate likes
        const existingLike = await Like.findOne({ post, user });
        if (existingLike) {
            return res.status(400).json({ error: "You have already liked this post" });
        }
        const like = new Like({ post, user });
        const savedLike = await like.save();
        //update the post collection basis on this
        const udpatedPost = await Post.findByIdAndUpdate(post, { $push: { likes: savedLike._id } }, { new: true })
            .populate("likes").exec();
        res.json({ post: udpatedPost });
    } catch (error) {
        return res.status(400).json({ error: "Error while Liking post" });
    }
};

//Unlike a post
exports.unlikePost = async (req, res) => {
    try {
        const { post } = req.body;
        const user = req.user.id;
        // Find the like by this user on this post
        const deletedLike = await Like.findOneAndDelete({ post, user });
        if (!deletedLike) {
            return res.status(400).json({ error: "You have not liked this post" });
        }
        //udpate the post collection
        const udpatedPost = await Post.findByIdAndUpdate(post, { $pull: { likes: deletedLike._id } }, { new: true })
            .populate("likes").exec();
        res.json({ post: udpatedPost });
    } catch (error) {
        return res.status(400).json({ error: "Error while Unliking post" });
    }
};

exports.dummyLink = (req, res) => {
    res.send("This is your Dummy Page");
};