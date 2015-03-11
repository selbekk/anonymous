var Entry = require('./../models/entry');

module.exports = Backbone.Collection.extend({
    model: Entry,
    url: '/api/entries'
});