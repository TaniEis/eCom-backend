import express from "express";
const router = express.Router();

const Watch = require('../models/Watch');
const Cart = require('../models/Cart');

// Create A Watch for specific user
router.post('/:user_id', async (req, res) => {
	const watch = new Watch({
		watch_id: req.body.watch_id,
		name: req.body.name,
		price: req.body.price,
		discount_qty: req.body.discount_qty,
		discount_percentage: req.body.discount_percentage
	})

	try{
		const savedWatch = await watch.save();
		res.json(savedWatch)
	} catch (err) {
		res.json({ message: err })
	}
});

// Post To Cart And Aggregate
router.post('/checkout', async(req, res) => {
try{

} catch (err) {
	res.json({ message: err })
}
});

// Delete Specific Watch of a user - Delete
router.get('/clear', async(req, res) => {
	try {
		Cart.deleteMany();
	} catch(err) {
		res.json({ message: err });
	}
});

module.exports = router;