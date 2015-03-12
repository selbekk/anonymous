var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

var app = express();

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use('/bower_components',  express.static('./../bower_components'));
app.use(bodyParser.urlencoded({ extended: false }));

var entries = [
    {
        id: 1,
        title: 'my title',
        body: 'my body'
    },
    {
        id: 2,
        title: 'my second title',
        body: 'my second body'
    }
];

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
