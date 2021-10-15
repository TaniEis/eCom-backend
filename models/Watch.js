import mongoose from "mongoose";

const WatchSchema = mongoose.Schema({
	watch_id: {
		type: String,
		required: "Add watch id"
	},
	name: {
		type: String,
		required: "Add name"
	},
	price: {
		type: Number,
		required: "Add price"
	},
	discount_qty: {
		type: Number,
		required: "Add discount qty"
	},
	discount_percentage: {
		type: Number,
		required: "Add discount percentage"
	},
});

const Watch = mongoose.model("Watch", WatchSchema);

export default Watch;