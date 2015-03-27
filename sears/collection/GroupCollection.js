/**
 * @desc		stores the POST state and response state of authentication for user
 */
define([
	"models/GroupModel",
    "app",
    "utils"
], function(GroupModel,app){

    
var GroupCollection = Backbone.Collection.extend({
    model: GroupModel,
    url:"../api/groups.php"
  });
    
    return GroupCollection;
});



