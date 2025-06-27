const Post = require("../models/postModel");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        let imageUrl = null;

        // If an image file is uploaded
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "blog_images"
            });
            imageUrl = result.secure_url;
            // Remove file from local uploads after upload
            fs.unlinkSync(req.file.path);
        }

        const post = new Post({
            title,
            body,
            image: imageUrl,
        });
        const savedPost = await post.save();

        res.json({
            post: savedPost,
        });
    } catch (error) {
        return res.status(400).json({
            error: "Error while creating post",
        });
    }
};


//need some more testing after completing like wala controleer
exports.getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find().populate("likes").populate("comments").exec();
        res.json({
            posts,
        })
    }
    catch(error) {
        return res.status(400).json({
            error: "Error while fetching post",
        });
    }
}