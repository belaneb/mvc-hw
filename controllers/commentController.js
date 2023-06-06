const Comment = require("../models/comment.model");

exports.createComment = async (req, res) => {

    try {
        
        // Create the new blog
        const newComment = await Comment.create({
            author: req.session.user.username,
            blog: req.params.id,
            comment: req.body.comment,
        });


        // Redirect to the dashboard or any other desired page
        res.redirect(`/blog/get/${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.redirect('/signup');
    }
}