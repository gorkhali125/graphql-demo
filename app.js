const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Note = require('./models/note');

const app = express();

app.use(bodyParser.json());
app.use('/', (req, res) => {
	res.status(200).json({ message: 'Server Connected!' });
});


const mongoUri = 'mongodb://localhost:27017/graphql-demo';
mongoose
	.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: 1 })
	.then(() => {
		app.listen(3002, () => {
			console.log('Server listening to port 3002...');
		});
	})
	.catch((err) => {
		console.log(err);
	});
