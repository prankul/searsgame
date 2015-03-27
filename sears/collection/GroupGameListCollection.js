/**
 * @desc        stores the POST state and response state of authentication for user
 */
define([
    "models/GroupGameModel",
    "app",
    "utils"
], function(GroupGameModel,app){

    
var GroupGameCollection = Backbone.Collection.extend({
    model: GroupGameModel,
    url:"../api/groupGame.php"
  });
    
    return GroupGameCollection;
});



