var Entries = require('../collections/entries');
var EntryView = require('../views/entry');

module.exports = Backbone.View.extend({
    initialize: function () {
        this.collection.on('add', this.render, this);
    },
    tagName: 'section',
    className: 'entries',
    render: function() {
        this.$el.html('');
        this.collection.each(function (entry) {
            var entryView = new EntryView({model: entry});
            this.$el.append(entryView.render().el);
        }, this);
        return this;
    }
});