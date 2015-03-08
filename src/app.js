var express = require('express');

var app = express();
app.use(express.static('public'));

var entries = [];

app.route('/api/entries')
	.get(function(req, res) {
		res.json(entries);
	})
	.post(function(req, res) {
		res.sendStatus(201);
	});

app.listen(8000, function() {
	console.log("listening on port 8000");
});
