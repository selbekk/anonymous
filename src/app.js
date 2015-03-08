var express = require('express');

var app = express();
app.use(express.static('public'));

var entries = [];

app.route('api')
	.get('/entries', function(req, res) {
		res.json(entries);
	})
	.post('/entries', function(req, res) {
		res.status(201);
	});

app.listen(8000, function() {
	console.log("listening on port 8000");
});
