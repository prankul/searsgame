// Filename: app.js
define([
  'jquery', 
  'underscore', 
  'backbone',
  'router',
  'views/login/LoginView',
  'views/register/RegistrationView',
  'models/session/SessionModel'   
  // Request router.js
], function($, _, Backbone, Router,LoginView,RegistrationView,Session){


  var initialize = function(){
    // Pass in our Router module and call it's initialize function
     Router.initialize();
   };

  
  // force ajax call on all browsers
   $.ajaxSetup({ cache: false }); 
   
  return { 
    initialize: initialize
  };
});
