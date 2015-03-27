/**
 * @desc		stores the POST state and response state of authentication for user
 */
define([
	"models/ExpectationModel",
    "app",
    "utils"
], function(ExpectationModel,app){

    
var ExpectationCollection = Backbone.Collection.extend({
    model: ExpectationModel,
    url:"api/expectation"
  });
    
    return ExpectationCollection;
});



