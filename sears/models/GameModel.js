/**
 * @desc		stores the POST state and response state of authentication for user
 */
define([
    "app",
    "utils"
], function(app){

    var GameModel = Backbone.Model.extend({

        initialize: function(){
            _.bindAll(this);
           
         
        },

        defaults: {
            id: 0,
            number_of_picks : 0,
            goal: [],
            group_id:'',
            result : [],
            expectation : [],
            current_count : 0,
            interval : 1,
            face : 0,
            group_game_id : 0,
            submitImage : "",
            endDate : ""
            
        },

        url: function(){
            return app.API + '/saveGame.php';
        },

       
    });
    
    return GameModel;
});

