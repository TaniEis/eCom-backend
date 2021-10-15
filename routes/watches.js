import express from "express";
const router = express.Router();

import Watch from "../models/Watch.js";
import Cart from "../models/Cart.js";

// Create A Watch for specific user
// router.post('/:user_id', async (req, res) => {
// 	const watch = new Watch({
// 		watch_id: req.body.watch_id,
// 		name: req.body.name,
// 		price: req.body.price,
// 		discount_qty: req.body.discount_qty,
// 		discount_percentage: req.body.discount_percentage
// 	})

// 	try{
// 		const savedWatch = await watch.save();
// 		res.json(savedWatch)
// 	} catch (err) {
// 		res.json({ message: err })
// 	}
// });

// Post To Cart And Aggregate
router.post('/checkout', async(req, res) => {
try{
	const watchesIdsAndQty = Object.entries(req.body.reduce( (acc, watch) => {
		acc[watch] = (acc[watch] || 0) + 1;
		return acc;
	  } ,{})).map(watch => ({watch_id:watch[0], quantity:watch[1]}));

	const watchesIdsFromDB = await Watch.find({ 'watch_id': {$in: req.body} }).select('_id');
	const CartReady = watchesIdsAndQty.map((os, indx) => ({...os, watch_id:watchesIdsFromDB[indx]._id}));

	await Cart.insertMany(CartReady);

	const pipe = [
		{
		  "$lookup": {
			"from": "watches",
			"localField": "watch_id",
			"foreignField": "_id",
			"as": "watches"
		  }
		},
		{
		  "$set": {
			"watches": {
			  "$first": "$watches"
			}
		  }
		},
		{
		  "$project": {
			"total_each": {
			  "$multiply": [
				{
				  $subtract: [
					"$quantity",
					{
					  "$multiply": [
						{
						  $floor: {
							$divide: [
							  "$quantity",
							  "$watches.discount_qty"
							]
						  }
						},
						"$watches.discount_percentage"
					  ]
					}
				  ]
				},
				"$watches.price"
			  ]
			}
		  }
		},
		{
		  "$group": {
			"_id": null,
			"total": {
			  "$sum": "$total_each"
			}
		  }
		}
	];

	const getTotalPrice = await Cart.aggregate(pipe);
		
	console.log(getTotalPrice);

	res.json(getTotalPrice);
	 
} catch (err) {
	res.json({ message: err })
}
});

// Delete Specific Watch of a user - Delete
router.get('/clear', async(req, res) => {
	try {
		const clear = await Cart.deleteMany();
		res.json(clear);
	} catch(err) {
		res.json({ message: err });
	}
});

export default router;