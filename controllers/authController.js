const User = require("../models/user.model");
const bcrypt = require('bcrypt');
exports.getLoginPage = (req, res) => {
  if (req.session.user) {
      // User is authenticated, proceed to the next middleware or route handler
      res.redirect('/dashboard');
  } else {
      // User is not authenticated, redirect to the login page
      res.render('login');
  }
}
exports.getSignupPage = (req, res) => {
  if (req.session.user) {
      // User is authenticated, proceed to the dashboard
      res.redirect('/dashboard');
  } else {
      // User is not authenticated, redirect to the signup page
      res.render('signup');
  }
}

exports.signout = (req, res) => {
  // Destroy the session and redirect to the login page
  req.session.destroy(() => {
      res.redirect('/login');
  });
}

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
      // Find the user by username
      const user = await User.findOne({ where: { username } });

      // If the user does not exist, redirect back to the login page
      if (!user) {
          return res.redirect('/login');
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      // If the password is incorrect, redirect back to the login page
      if (!passwordMatch) {
          return res.redirect('/login');
      }

      // Create a session for the authenticated user
      req.session.user = user;

      // Redirect to the dashboard or any other desired page
      res.redirect('/dashboard');
  } catch (error) {
      console.error(error);
      res.redirect('/login');
  }
}

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
      // Check if the username already exists
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
          return res.redirect('/signup');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const newUser = await User.create({
          username,
          password: hashedPassword,
      });

      // Create a session for the newly registered user
      req.session.user = newUser;

      // Redirect to the dashboard or any other desired page
      res.redirect('/dashboard');
  } catch (error) {
      console.error(error);
      res.redirect('/signup');
  }
}