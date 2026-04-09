import db from "../database/connect.js";

class Reviews {
    constructor(review) {
        this.review_table_id = review.review_table_id;
        this.user_id = review.user_id;
        this.name = review.name;
        this.album = review.album;
        this.year = review.year;
        this.rating = review.rating;
        this.score1 = review.score1;
        this.score2 = review.score2;
        this.image = review.image;
    }

    //return all reviews that a specific user has entered
    static async getUserReviews(userID) {
        //console.log(`Hello ${userID}`);
        const response = await db.query(
            "SELECT * FROM reviews WHERE user_id = $1 ORDER BY review_table_id DESC",
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

        const { user_id, name, album, year, rating, score1, score2, image } =
            reviewInfo;

        const alreadyExist = await db.query(
            "SELECT 1 FROM reviews WHERE user_id = $1 AND movie_name = $2 AND year = $3",
            [user_id, name, year],
        );

        if (alreadyExist.rows.length > 0) {
            throw new Error("Review already exists!");
        } else {
            const response = await db.query(
                "INSERT INTO reviews (user_id, name, album, year, rating, score1, score2, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
                [user_id, name, album, year, rating, score1, score2, image],
            );
            return response.rows[0];
        }
    }
}

export default Reviews;
