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
		schema: buildSchema(`
    type Note {
      _id: ID!
      title: String!
      description: String!
      status: Float!
      date: String!
    }

    input NoteInput {
      title: String!
      description: String!
      status: Float!
      date: String!
    }

    type RootQuery {
      notes: [Note!]!
    }

    type RootMutation {
      createNote(noteInput: NoteInput) : Note
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
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
