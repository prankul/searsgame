/**
 * @desc		stores the POST state and response state of authentication for user
 */
define([
	"models/UserModel",
    "app",
    "utils"
], function(UserModel,app){

    
var UserCollection = Backbone.Collection.extend({
	
    model: UserModel,
    url:"../api/getMembers.php"
  });
    
    return UserCollection;
});



