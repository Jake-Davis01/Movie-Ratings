import db from '../database/connect'

class Reviews {
    constructor(review) {
        this.review_table_id = review.review_table_id;
        this.user_id = review.user_id;
        this.movie_name = review.movie_name;
        this.year = review.year;
        this.rating = review.rating;
        this.imdb = review.imdb;
        this.rotten = review.rotten;
        this.image = review.image;
    }


    //return all reviews that a specific user has entered
    static async getUSerReviews(userID) {
        const response = await db.query("SELECT * FROM reviews WHERE user_id = $1", [userID])

        if (response.rows.length === 0) {
            throw new Error("User Has No Reviews!");
        }

        return response.rows.map((review) => new Reviews(review))
    }
}