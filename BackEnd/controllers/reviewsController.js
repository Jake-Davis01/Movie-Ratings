import Reviews from '../models/Reviews.js';

//get a users reviews
async function getUserReviews(req, res) {
    const userID = req.params.id;
    //console.log(userID);
    try {
        const userReviews = await Reviews.getUserReviews(userID)
        res.status(200).send(userReviews);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}


//function to let user add new review to their account
async function newUserReviews(req, res) {
    const newReview = req.body;
    //console.log(newReview);
    try {
        const newUserReviews = await Reviews.addReview(newReview);
        res.status(200).send(newUserReviews);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

export default { getUserReviews, newUserReviews };