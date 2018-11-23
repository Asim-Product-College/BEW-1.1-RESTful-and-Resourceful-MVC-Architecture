const Review = require('../models/review');
const Comment = require('../models/comment');
// movies.js
const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('4d313fa568fdd92c8ed5e7abb6815e3c')

module.exports = function(app) {

    // INDEX - OUR FIRST MONGODB QUERY WITH A MONGOOSE MODEL

    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(response => {
            console.log(response.results)
            res.render('movies-index', {
                movies: response.results
            });
        }).catch((err) => {
            console.log(err.message);
        })
    })

    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({
            id: req.params.id
        }).then(movie => {
            if (movie.video) {
                moviedb.movieVideos({
                    id: req.params.id
                }).then(videos => {
                    movie.trailer_youtube_id = videos.results[0].key
                    renderTemplate(movie)
                })
            } else {
                renderTemplate(movie)
            }

            function renderTemplate(movie) {
                res.render('movies-show', {
                    movie: movie
                });
            }

        }).catch(console.error)
    })

    app.get('/movies/:movieId/reviews/new', (req, res) => {
        render('reviews-new', { movieId: req.params.movieId })
        console.log(req.body)
    })

}
