import User from "../models/Users.js";
import jwt from "jsonwebtoken";

// register a new user
async function register(req, res) {
    const { email, password, username, name, securityQuestions } = req.body;

    // extract just the first question from the array
    const securityQuestion = securityQuestions[0].question;
    const securityAnswer = securityQuestions[0].answer;

    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).send({ error: "Email already in use" });
        }

        const newUser = await User.createUser({ 
            email, 
            password, 
            securityQuestion, 
            securityAnswer, 
            username, 
            name: name || username
        });
        res.status(201).send({ message: "User registered successfully", user: newUser });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

// login
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).send({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { user_id: user.id, username: user.username },
            process.env.SECRET_TOKEN,
            { expiresIn: "24h" }
        );

        res.status(200).send({ token, user });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

// get user by id
async function getUser(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

// get logged in user from token
async function getMe(req, res) {
    const user_id = req.user.user_id;
    try {
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

// update user
async function updateUser(req, res) {
    const { id } = req.params;
    const { email, username, name } = req.body;
    try {
        const updated = await User.updateUser(id, { email, username, name });
        if (!updated) {
            return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send({ message: "User updated successfully", user: updated });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

// delete user
async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        const deleted = await User.deleteUser(id);
        if (!deleted) {
            return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

export default { register, login, getUser, updateUser, deleteUser, getMe };