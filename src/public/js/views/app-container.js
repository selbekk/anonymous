module.exports = Backbone.View.extend({
    childView: null,
    template: Anonymous.templates['appContainer'],
    render: function() {
        if(!this.childView) {
            console.log('no childview defined!');
            return this;
        }
        this.$el.html(this.template());
        this.$el.append(this.childView.render().el);
        return this;
    }
});