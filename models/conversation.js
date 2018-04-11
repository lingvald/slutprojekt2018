var mongoose = require('mongoose');

var ConversationSchema = new mongoose.Schema({
	username: String,
	message: String,
	user_id: String,
	opponent: String,
	imgUrl: String
});

module.exports = mongoose.model('Conversation', ConversationSchema);
