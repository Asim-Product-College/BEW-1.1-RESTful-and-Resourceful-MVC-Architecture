// scripts.js

// function destroyReview(id) {
//     let deleteReview = document.querySelector('.delete-review');
//     let reviewId = deleteReview.getAttribute('data-review-id');
//     axios.delete(`admin/reviews/${reviewId}`).then(res => {
//         let review = document.querySelector('.review-box');
//         review.style.display = 'none';
//     }).catch(err => {
//         console.log(err);
//     })
// }

function deleting(id) {
    console.log("hellloooo");
    let deleteReview = document.getElementById('delete-review');
    let reviewId = deleteReview.getAttribute('data-review-id');
    console.log('-------', reviewId);
    axios.delete(`admin/reviews/${reviewId}`).then(res => {
        console.log('>>>>>>>', res);
        let review = document.getElementById('review-box');
        review.parentNode.removeChild(review);
        // review.style.display = 'none';
    }).catch(err => {
        console.log(err);
    })
}

// listen for admin delete review
// let reviewId = deleteReview.getAttribute('data-review-id');
// documents.getElementById('delete-review').addEventListener("click", e => {
    // prevent the default form behavior
    // e.preventDefault();
    // axios.delete(`/admin/reviews/${reviewId}`)
    //     .then.delete();
// })

// listen for a form submit event
document.getElementById('newComment').addEventListener("submit", e => {
    console.log("in comment function");
    // prevent the default form behavior
    e.preventDefault();
    // serialize the form data into an object
    let comment  = new FormData(newComment)
    // create JSON object
    let comment = {}

    for (let i of commentForm) {
        comment[i[0]] = i[1];
    }
    console.log(JSON.stringify(comment));
    // let comment = this.serializeArray()
    // use axios to initialize a post request and send in the form data
    axios.post('/reviews/comments', comment)
      .then(function (response) {
        // wait for the success response from the server
        console.log(response);
        // remove the information from the form
        this.reset();
        // display the data as a new comment on the page
        document.getElementById('comments').prepend(
          `
           <div class="card">
             <div class="card-block">
               <h4 class="card-title">${response.title}</h4>
               <p class="card-text">${response.content}</p>
               <p>
                  <form method="POST" action="/reviews/comments/${response._id}?_method=DELETE">
                    <button class="btn btn-link" type="submit">Delete</button>
                  </form>
               </p>
             </div>
           </div>
          `
        );
      })
})

// wait for the success response from the server
// remove the information from the form
// display the data as a new comment on the page
// handle any errors
