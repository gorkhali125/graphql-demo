const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	status: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
});

module.exports = mongoose.model('Note', noteSchema);