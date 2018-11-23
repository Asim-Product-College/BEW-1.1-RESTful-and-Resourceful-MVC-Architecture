const Review = require('../models/review');
const Comment = require('../models/comment');


module.exports = function(app) {


    ////// Create comment ///////
    // CREATE Comment
    app.post('/reviews/comments', (req, res) => {
      Comment.create(req.body).then(comment => {
        res.status(200).send({ comment: comment });
      }).catch((err) => {
        res.status(400).send({ err: err })
      })
    })
}
