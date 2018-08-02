const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import Product model
const Product = require('../models/product');

// Handle incoming GET requests to /products
router.get('/', (req, res, next) => {
	Product 
		.find()
		.select("name price _id")
		.then(docs => {
			const response = {
				count: docs.length,
				products: docs.map(doc => {
					return {
						name: doc.name,
						price: doc.price,
						_id: doc._id,
						request: {
							type: 'GET',
							url: 'http://localhost:3000/products/' + doc._id
						}
					}
				})
			};
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

// Handle incoming POST requests to /products
router.post('/', (req, res, next) => {
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price
	});

	product
		.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'Created product successfully',
				createdProduct: {
					name: result.name,
					price: result.price,
					_id: result._id,
					request: {
						type: 'POST',
						url: 'http://localhost:3000/products/' + result._id
					}
				}
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

// Handle incoming GET requests to /products/productId
router.get('/:productId', (req, res, next) => {
	const id = req.params.productId;
	Product.findById(id)
		.then(doc => {
			console.log("From database", doc);
			if (doc) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({ message: 'No valid entry found for provided ID'});
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error: err});
		});
});

// Handle incoming PATCH requests to /products/productId
router.patch('/:productId', (req, res, next) => {
	const id = req.params.productId;
	const updateOps = {};

	const keys = Object.keys(req.body);
	keys.forEach(function(key) {
		updateOps[key] = req.body[key];
	})

	Product.update({ _id: id }, { $set: updateOps })
		.then(result => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			})
		});
});

// Handle incoming DELETE requests to /products/productId
router.delete('/:productId', (req, res, next) => {
	const id = req.params.productId;
	Product.remove({ _id: id })
		.then(result => {
			res.status(200).json({
				message: 'Product deleted',
				request: {
					type: 'POST',
					url: 'http://localhost:3000/products',
					body: { name: 'String', price: 'Number'}
				}
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: res
			});
		});
});


module.exports = router;
