// initialize mongoose in app.js and connect to our database that we'll name after our app.
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {useNewUrlParser: true});

// Notice how the model is capitalized and singular. This is a universal pattern across many web frameworks
// to designate models. It looks sorta like a class, right? Classes and models are similar except
// classes save in recent memory, and models are stored on the database.
const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  rating: String
});

module.exports = Review
