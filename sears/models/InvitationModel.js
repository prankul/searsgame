/**
 * @desc		stores the POST state and response state of authentication for user
 */
define([
    "app",
    "utils"
], function(app){

    var InvitationModel = Backbone.Model.extend({

        initialize: function(){
            _.bindAll(this);
           
         
        },

        defaults: {
            id: 0,
            emailId: '',
            groupId:'',
            status:0

            
        },

        url: function(){
            return app.API + '/saveInvitation.php';
        }

        

       
           





    });
    
    return InvitationModel;
});

