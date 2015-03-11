var express = require('express'),
    bodyParser = require('body-parser');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

var entries = [];

app.route('/api/entries')
	.get(function(req, res) {
		res.json(entries);
	})
	.post(function(req, res) {
        var entry = req.body;
        entries.push(entry);
		res.sendStatus(201);
	});

app.listen(8000, function() {
	console.log("listening on port 8000");
});
