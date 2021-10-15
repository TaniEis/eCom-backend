import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();

import { registerValidation, loginValidation } from "../validation.js";
// MongoDB Model
import User from "../models/User.js";

// Register User
router.post('/register', async (req, res) => {

	// Validate User
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Check if User already in database
	const emailExist = await User.findOne({ email: req.body.email });
	if ( emailExist ) return res.status(400).send('Email is already exists');

	// Hash Passwords
	const hash = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, hash);

	// Validated And Create User
	const user = new User({ 
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	});

	try{
		const savedUser = await user.save();
		res.json({ name: user.name, email: user.email });
	} catch (err) {
		res.json({ message: err });
	}
});

// Login User
router.post('/login', async(req, res) => {
	const { error } = loginValidation(req.body);
	if ( error ) return res.status(400).send(error.details[0].message);

	// Check if Email Exists
	const user = await User.findOne({ email: req.body.email });
	if ( !user ) return res.status(400).send('Email Does Not Exist');

	const validPass = await bcrypt.compare(req.body.password, user.password)
	if ( !validPass ) return res.status(400).send('Invalid Password');

	// Create & Assign Token 
	const token = jwt.sign({ _id: user._id }, "TOKEN_SECRET123");
	res.header('auth-token', token).send(token);
});

export default router;