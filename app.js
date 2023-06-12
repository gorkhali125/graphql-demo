const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const Note = require('./models/note');

const appPort = 3002;

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
		rootValue: {
			notes: async () => {
				try {
					const notes = await Note.find();
					return notes.map((note) => {
						return { ...note._doc };
					});
				}
				catch (err) {
					throw err;
				}
			},
			createNote: (args) => {
				const note = new Note({
					title: args.noteInput.title,
					description: args.noteInput.description,
					status: +args.noteInput.status,
					date: new Date(args.noteInput.date)
				});
				return note
					.save()
					.then((result) => {
						return { ...result._doc };
					})
					.catch((err) => {
						throw err;
					});
			},
		},
		graphiql: true
	})
);

app.use('/', (req, res) => {
	res.status(200).json({ message: `Server Connected! For trying out graphql, goto http://localhost:${appPort}/graphql` });
});

const mongoUri = 'mongodb://localhost:27017/graphql-demo';
mongoose
	.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: 1 })
	.then(() => {
		app.listen(appPort, () => {
			console.log(`Server listening to port ${appPort}...`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
