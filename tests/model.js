import mongoose from "mongoose";

const WatchSchema = new mongoose.Schema({
    watch_id:               { type: String, required: true },
    name:                   { type: String, required: true },
    price:                  { type: Number, required: true },
    discount_qty:           { type: Number, required: true },
    discount_percentage:    { type: Number, required: true }
});

const Watch = mongoose.model("Watch", WatchSchema);

export default Watch;