const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");

const ProductsController = require("../controllers/products");

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


// Handle incoming GET requests to /products
router.get('/', ProductsController.products_get_all);

// Handle incoming POST requests to /products
router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product);

// Handle incoming GET requests to /products/productId
router.get('/:productId', ProductsController.products_get_product);

// Handle incoming PATCH requests to /products/productId
router.patch('/:productId', checkAuth, ProductsController.products_update_product);

// Handle incoming DELETE requests to /products/productId
router.delete('/:productId', checkAuth, ProductsController.products_delete_product);


module.exports = router;
