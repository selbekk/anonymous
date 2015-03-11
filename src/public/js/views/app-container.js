module.exports = Backbone.View.extend({
    childView: null,
    render: function() {
        if(!this.childView) {
            console.log('no childview defined!');
            return this;
        }
        this.$el.append(this.childView.render().$el);
        return this;
    }
});