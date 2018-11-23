// controllers/admin.js

const Review = require('../models/review')

module.exports = function (app) {

  // NEW Comment
  app.get('/admin', (req, res) => {
    Review.find()
      .then(reviews => {
          res.render('admin', { reviews: reviews });
      })
      .catch(error => {
        console.log(error);
      });
  });

  app.delete('/admin/reviews/:id', function(req, res) {
      Review.findByIdAndRemove(req.params.id).then((review) => {
          res.status(200).send(review);
      }).catch((err) => {
          res.status(400).send(err);
      })
  });

  // app.delete('/reviews/:id', function(req, res) {
  //   console.log("DELETE review")
  //   Review.findByIdAndRemove(req.params.id).then((review) => {
  //       res.redirect('/');
  //   }).catch((err) => {
  //       console.log(err.message);
  //   })

}
