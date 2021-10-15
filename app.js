import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors())
app.use(express.json()); // to accept json data

// The Routes
import watchesRoute from "./routes/watches.js"
import userRoute from "./routes/user.js"

app.use('/watches', watchesRoute);
app.use('/user', userRoute);

//Routes
app.get('/', (req, res) => {
	res.send('Welcome to HomePage')
});

// Connect MongoDB
mongoose.connect("mongodb+srv://taniEis:qFjyKWTNi8ww2q8r@cluster0.bqrsw.mongodb.net/testing?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true  }, () => {
	console.log("Connected to DB")
});

app.listen(3000, () => {
	console.log("Running RESTful API on port http://localhost:3000");
});
