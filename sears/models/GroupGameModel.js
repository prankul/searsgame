/**
 * @desc        stores the POST state and response state of authentication for user
 */
define([
    "app",
    "utils"
], function(app){

    var GroupGameModel = Backbone.Model.extend({

        initialize: function(){
            _.bindAll(this);
        
        },
        idAttribute: '_id',
        defaults: {
                
                _id : 0,
                gameName : "",
                gameFace : "2", 
                groupId : 0,
                picks : 324,
                is_admin : false 
            },

        url: function(){
            return app.API + '/saveGroupGame.php';
        }

    });
    
    return GroupGameModel;
});

