module.exports = Backbone.View.extend({
    tagName: 'article',
    className: 'entry',
    template: Anonymous.templates['entry'],
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});