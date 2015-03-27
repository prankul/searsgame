define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/game/startGameTemplate.html'
    ], function($, _, Backbone, startGameTemplate){

        var StartGameView = Backbone.View.extend({
            el: $("#page"),

            events: {
                "change .game_typeJQ": "gameSelected"
            },

            gameSelected: function(e){
                var goal_select_options = '';
                var expectations_cnt = e.target.value;
                $('.expectation_container').empty();
                for(var i=1; i <= expectations_cnt; i++){
                    $('.expectation_container').append("<div class='form-group'><input type='text' class='form-control' id='expectation["+i+"]' placeholder='Expectation "+i+"' name='expectation["+i+"]' value=''></div>");

                    //goal select box
                    goal_select_options = goal_select_options + "<option value='"+i+"'>Expectation "+i+"</option>";

                }
                
                $('.goal_container').html("<select name='goal' class='form-control'>"+goal_select_options+"</select>")

            },

            render: function(){

                $('.menu li').removeClass('active');
                $('.menu li a[href="'+window.location.hash+'"]').parent().addClass('active');








                this.$el.html(startGameTemplate);



            }

        });

        return StartGameView;

});
