define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/settings/settingsTemplate.html'
    ], function($, _, Backbone, settingsTemplate){

        var SettingsView = Backbone.View.extend({
            el: $("#page"),

            render: function(){

                $('.menu li').removeClass('active');
                $('.menu li a[href="'+window.location.hash+'"]').parent().addClass('active');
                
                this.$el.html(settingsTemplate);

              

            }

        });

        return SettingsView;

});
