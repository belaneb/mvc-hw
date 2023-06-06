const dotenv = require('dotenv')
const express = require('express');
const expressSession = require('express-session');
const hbs = require('express-handlebars');
const Sequelize = require("sequelize");
const User = require('./models/user.model.js');
const Blog = require('./models/blog.model.js');
const Comment = require('./models/comment.model.js');
const blogController = require('./controllers/blogController.js')
const commentController = require('./controllers/commentController.js')
const homeController = require('./controllers/homeController.js')
const authController = require('./controllers/authController.js')
const bodyParser = require('body-parser')
const SequelizeStore = require('connect-session-sequelize')(expressSession.Store);
const app = express();

// User.hasMany(Comment)
// Comment.belongsTo(User)

dotenv.config()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
const sequelize = new Sequelize(
    process.env.DBNAME, process.env.DBUSER, process.env.DBPASS,
    {
        host: process.env.DBHOST,
        dialect: 'mysql'
    }
);

// Set up session middleware
app.use(
    expressSession({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        store: new SequelizeStore({
            db: sequelize,
            checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
            expiration: 24 * 60 * 60 * 1000 // expires every 24 hour
        }),
    })
);

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        // User is authenticated, proceed to the next middleware or route handler
        next();
    } else {
        // User is not authenticated, redirect to the login page
        res.redirect('/login');
    }
};

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});
sequelize.sync()

// Configure handlebars as the view engine
app.engine('handlebars', hbs.engine());
app.set('view engine', 'handlebars');

// Define routes
app.get('/', homeController.index);

app.get('/dashboard', isAuthenticated, homeController.dashboard);

app.get('/login', authController.getLoginPage);
app.get('/signup', authController.getSignupPage);

app.get('/logout', authController.signout);
app.post('/auth/login', authController.login);
app.post('/auth/signup', authController.signup);
app.post('/comment/create/:id', isAuthenticated, commentController.createComment);
app.post('/blog/create', isAuthenticated, blogController.createBlog);
app.post('/blog/delete/:id', isAuthenticated, blogController.deleteBlog);
app.get('/blog/get/:id', isAuthenticated, blogController.getBlog);
app.post('/blog/edit/:id', isAuthenticated, blogController.editBlog);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
