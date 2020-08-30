const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const Note = require('./models/note');

const app = express();

app.use(bodyParser.json());

app.use(
	'/graphql',
	graphqlHttp({
		graphiql: true
	})
);

app.use('/', (req, res) => {
	res.status(200).json({ message: 'Server Connected! For trying out graphql, goto http://localhost:3002/graphql' });
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
