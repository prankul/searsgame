/**
 * @desc		stores the POST state and response state of authentication for user
 */
define([
    "models/UserModel",
    "app",
    "utils"
    
], function(UserModel,app){

    var MemberModel = UserModel.extend({

       
      

        initialize: function(){
            _.bindAll(this);
        
        },

        defaults: {
          
          groupId : ""
        },

        url: function(){

            
            return app.API + '/member.php?id='+encodeURIComponent(this.id)+'&groupId='+encodeURIComponent(this.get("groupId"));
        }

    });
    
    return MemberModel;
});

