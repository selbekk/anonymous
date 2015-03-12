var AppContainerView = require('./../views/app-container');
var EntriesView = require('./../views/entries');
var EntriesCollection = require('./../collections/entries');

module.exports = Backbone.Router.extend({
    initialize: function() {
        this.entries = new EntriesCollection();
        this.container = new AppContainerView({ el: $('#app')});
    },
    routes: {
        '': 'frontpage',
        'write': 'write',
        'read': 'read'
    },
    frontpage: function() {
        this.container.childView = new EntriesView({collection: this.entries});
        this.entries.fetch();
        this.container.render();
    },
    write: function() {

    },
    read: function() {

    }
});