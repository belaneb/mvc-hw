const Blog = require("../models/blog.model");

exports.index = async (req, res) => {
    try {
        // Find the user by username
        const blogs = await Blog.findAll();
        // console.log(blogs)
        res.render('index', { blogs: blogs, isUserAuthenticated: !!req.session.user });
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
}

exports.dashboard = async (req, res) => {
    try {
        // Find the user by username
        const blogs = await Blog.findAll(
            {
                where: {
                    author: req.session.user.id
                }
            }
        );
        res.render('dashboard', {blogs: blogs, isUserAuthenticated: !!req.session.user});
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
}