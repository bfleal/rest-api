const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes =  require('./api/routes/products');
const orderRoutes =  require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Handle CORS - Cross-Origin Resource Sharing
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*'); // * means that API allow access of any origin. They can allow access from a specificy origin to, like https://some-client.com
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Autorization');

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}

	next();
});

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//  Handle requests that no reach routes
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error); // forward the error request no next middleware
});

// Handle error in requests or in application
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

/*
app.use((req, res, next) => {
	res.status(200).json({
		message: 'It works!'
	});
});
*/

module.exports = app;
