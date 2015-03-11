module.exports = Backbone.View.extend({
    childView: null,
    template: Anonymous.templates['appContainer'],
    render: function() {
        console.log(Anonymous.templates);
        if(!this.childView) {
            console.log('no childview defined!');
            return this;
        }
        this.$el.html(this.template({name: 'Kristofer'}));
        this.$el.append(this.childView.render().$el);
        return this;
    }
});