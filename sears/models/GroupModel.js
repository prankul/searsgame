/**
 * @desc		stores the POST state and response state of authentication for user
 */
define([
    "app",
    "utils"
], function(app){

    var GroupModel = Backbone.Model.extend({

        initialize: function(){
            _.bindAll(this);
        
        },

        defaults: {
            _id: 0,
            name: '',
            is_group_admin:null
			
			},

        url: function(){
            return app.API + '/saveGroup.php';
        }

    });
    
    return GroupModel;
});

