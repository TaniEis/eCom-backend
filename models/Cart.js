import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
	watch_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Watch",
	  },
	  quantity: {
		type: Number,
		required: "Add quantity to the cartItem",
	  },
}, { collection: 'cart' });

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;