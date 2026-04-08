const db = require("../database/connect")

class User {
    constructor({user_id, email, password, security_question, security_answer, username, name,}) {
        this.id = user_id;
        this.email = email;
        this.password = password;
        this.securityQuestion = security_question;
        this.securityAnswer = security_answer;
        this.username = username;
        this.name = name;
    }

    static async findByEmail(email) {
        const response = await db.query(
            "SELECT * FROM users WHERE email = $1;",
            [email]
        );

        if (response.rows.length === 0) {
            return null;
        }

        return new User(response.rows[0]);
    }

    static async findById(id) {
        const response = await db.query(
            "SELECT user_id, email, username, name FROM users WHERE user_id = $1;",
            [id]
        );

        if (response.rows.length === 0) {
            return null;
        }

        return new User(response.rows[0]);
    }

    static async createUser({email, password, securityQuestion, securityAnswer, username, name,}) {
        const response = await db.query(
            `INSERT INTO users 
                (email, password, security_question, security_answer, username, name)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;`,
            [email, password, securityQuestion, securityAnswer, username, name,]
        );

        if (response.rows.length !== 1) {
            throw new Error("Unable to create user.")
        }

        return new User(response.rows[0]);
    }

    static async updateUser(id, { email, username, name }) {
        const response = await db.query(
        `UPDATE users 
        SET email = $1, username = $2, name = $3 
        WHERE user_id = $4 
        RETURNING *;`,
        [email, username, name, id]
        );

        if (response.rows.length === 0) {
        return null;
        }

        return new User(response.rows[0]);
    }

    static async deleteUser(id) {
        const response = await db.query(
        "DELETE FROM users WHERE user_id = $1 RETURNING *;",
        [id]
        );

        if (response.rows.length === 0) {
        return null;
        }

        return new User(response.rows[0]);
    }
}

module.exports = User