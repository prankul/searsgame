define([
"app",
"utils"
], function(app){
var UserModel = Backbone.Model.extend({
initialize: function(){
_.bindAll(this);
},
defaults: {
id: 0,
username: '',
name: '',
email: ''
},
url: function(){
return app.API + '/user';
}
});
return UserModel;
});