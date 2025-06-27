//import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//business logic 

exports.createComment = async (req, res) => {
    try{
        //fetch data from req body 
        const { post, body } = req.body;
        //create a comment object
        const comment = new Comment({
            post,
            user: req.user.id,
            body
        });

        //save the new comment into the database
        const savedComment = await comment.save();

        //find the post by ID, add the new commnet to its comments array
        const udpatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id} }, {new: true}  )
                            .populate("comments") //populate the comments array with comment documents
                            .exec();

        res.json({
            post: udpatedPost,
        });

    }
    catch(error) {
        return res.status(500).json({
            error: "Error While Creating comment" ,
        });
    }
};

// Delete comment (only by author)
exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        if (comment.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Not authorized to delete this comment" });
        }
        await Comment.findByIdAndDelete(commentId);
        // Optionally remove from post.comments array
        await Post.findByIdAndUpdate(comment.post, { $pull: { comments: commentId } });
        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Error while deleting comment" });
    }
};