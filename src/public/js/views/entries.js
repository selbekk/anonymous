var Entries = require('../collections/entries');

module.exports = Backbone.View.extend({
    collection: Entries,
    tagName: 'ul',
    className: 'entries',
    render: function() {
        this.$el.html('hello from view');
        return this;
    }
});