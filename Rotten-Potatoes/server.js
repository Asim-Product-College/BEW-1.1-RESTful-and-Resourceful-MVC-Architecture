const reviews = require('./controllers/reviews');
const movies = require('./controllers/movies');
const comments = require('./controllers/comments');
const admin = require('./controllers/admin');
// INITIALIZE BODY-PARSER module AND ADD IT TO APP
const bodyParser = require('body-parser');
const express = require('express')
const methodOverride = require('method-override')
const app = express()
// solves heroku error
const port = process.env.PORT || 5000;
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

app.use(express.static('public'))


// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));
var exphbs = require('express-handlebars');

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))
reviews(app);
comments(app);
movies(app);
admin(app);
// body-parser gives us a new attribute of the req object
// called req.body and this will contain the form data.

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



module.exports = app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
