const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './uploads/');
	},
	filename: function(req, file, callback) {
		callback(null, new Date().toISOString() + file.originalname);
	}
});

const fileFilter = (req, file, callback) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		callback(null, true);
	} else {
		callback(null, false); // reject a file
	}
};

const upload = multer({ 
	storage: storage, 
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter 
});

// Import Product model
const Product = require('../models/product');

// Handle incoming GET requests to /products
router.get('/', (req, res, next) => {
	Product 
		.find()
		.select("_id name price productImage")
		.then(docs => {
			const response = {
				count: docs.length,
				products: docs.map(doc => {
					return {
						_id: doc._id,
						name: doc.name,
						price: doc.price,
						productImage: doc.productImage,
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
router.post('/', upload.single('productImage'), (req, res, next) => {
	console.log(req.file);
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		productImage: req.file.path
	});

	product
		.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'Created product successfully',
				createdProduct: {
					_id: result._id,
					name: result.name,
					price: result.price,
					productImage: req.file.path,
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
		.select('_id name price productImage')
		.then(doc => {
			console.log("From database", doc);
			if (doc) {
				res.status(200).json({
					product: doc,
					request: {
						type: 'GET',
						url: 'http://localhost:3000/products'
					}
				});
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
