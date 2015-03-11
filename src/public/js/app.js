var Router = require('./routes/router');

$(function() {
    var router = new Router();
    Backbone.history.start({pushState: true});
});