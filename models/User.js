import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 5,
		max: 55
	},
	email: {
		type: String,
		required: true,
		min: 5,
		max: 55
	},
	password: {
		type: String,
		required: true,
		min: 5,
		max: 155
	},
	cart: [
		{
		  type: mongoose.Types.ObjectId,
		  ref: "Cart",
		},
	  ],
	date: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model("User", UserSchema);

export default User;