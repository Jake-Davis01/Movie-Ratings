import db from "../database/connect.js";

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
    static async getUserReviews(userID) {
        //console.log(`Hello ${userID}`);
        const response = await db.query(
            "SELECT * FROM reviews WHERE user_id = $1",
            [userID],
        );

        if (response.rows.length === 0) {
            throw new Error("User Has No Reviews!");
        }

        return response.rows.map((review) => new Reviews(review));
    }

    //let user add in new review
    static async addReview(reviewInfo) {
        //console.log("Hello");
        //console.log(reviewInfo);

        const { user_id, movie_name, year, rating, imdb, rotten, image } =
            reviewInfo;

        const alreadyExist = await db.query(
            "SELECT 1 FROM reviews WHERE user_id = $1 AND movie_name = $2 AND year = $3",
            [user_id, movie_name, year],
        );

        if (alreadyExist.rows.length > 0) {
            throw new Error("Review already exists!");
        } else {
            const response = await db.query(
                "INSERT INTO reviews (user_id, movie_name, year, rating, imdb, rotten, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
                [user_id, movie_name, year, rating, imdb, rotten, image],
            );
            return response.rows[0];
        }
    }
}

export default Reviews;
