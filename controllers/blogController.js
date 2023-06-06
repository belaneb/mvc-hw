const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");

exports.createBlog = async (req, res) => {

    try {
        
        // Create the new blog
        const newBlog = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            author: req.session.user.id,
        });


        // Redirect to the dashboard or any other desired page
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.redirect('/signup');
    }
}
exports.deleteBlog = async (req, res) => {
    try {
        await Blog.destroy({
           where: {
               id: req.params.id
           }
       })

       // Redirect to the dashboard or any other desired page
       res.redirect('/dashboard');
   } catch (error) {
       console.error(error);
       res.redirect('/signup');
   }
}
exports.getBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne(
           {
           where: {
               id: req.params.id
           }
       })


       let comments = await Comment.findAll({
           where: {
               blog: req.params.id
           }
       })

       // Redirect to the dashboard or any other desired page
       res.render('blog', {isUserAuthenticated: !!req.session.user, blog: blog, comments: comments});
   } catch (error) {
       console.error(error);
       // res.redirect('/signup');
   }
}
exports.editBlog = async (req, res) => {
    try {
        await Blog.update(
           {
               title: req.body.title,
               content: req.body.content
           },
           {
           where: {
               id: req.params.id
           }
       })

       // Redirect to the dashboard or any other desired page
       res.redirect('/dashboard');
   } catch (error) {
       console.error(error);
       res.redirect('/signup');
   }
}