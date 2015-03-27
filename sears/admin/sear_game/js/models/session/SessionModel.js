	// views/app.js
	define([
	  'underscore',
	  'backbone'
	], function(_, Backbone) {
	  var SessionModel = Backbone.Model.extend({
	  
		urlRoot: '../sear_game/api/index.php',
		initialize: function () {
		  var that = this;
		  // Hook into jquery
		  // Use withCredentials to send the server cookies
		  // The server must allow this through response headers
		  $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
			options.xhrFields = {
			  withCredentials: true
			};
			// If we have a csrf token send it through with the next request
			if(typeof that.get('_csrf') !== 'undefined') {
			  jqXHR.setRequestHeader('X-CSRF-Token', that.get('_csrf'));
			}
		  });
		},
		login: function(creds) {
		  // Do a POST to /session and send the serialized form creds
		  this.save(creds, {
			 success: function () {}
		  });
		},
		logout: function() {
		  // Do a DELETE to /session and clear the clientside data
		  var that = this;
		  this.destroy({
			success: function (model, resp) {
			  model.clear()
			  model.id = null;
			  // Set auth to false to trigger a change:auth event
			  // The server also returns a new csrf token so that
			  // the user can relogin without refreshing the page
			  that.set({auth: false, _csrf: resp._csrf});
			  
			}
		  });      
		},
		getAuth: function(callback) {
		  // getAuth is wrapped around our router
		  // before we start any routers let us see if the user is valid
			
			var formValues = {
				userName: "saurabh",//$('#userName').val(),
				password: "saurabh"//$('#password').val()
			};
		 
			 $.ajax({
				url:"../sear_game/api/index.php",
				type:'POST',
				dataType:"json",
				data: formValues,
				success:function (data) {	
					console.log(["Login request details: ", data]);
					
					 this.fetch({
			
			   success: callback
		  });
				   
					if(data.error) {  // If there is an error, show the error messages
						//$('.alert-error').text(data.error.text).show();
						
						
					}
					else { // If not, send them back to the home page
						window.location.replace('#');
					}
				},
				 error: function(XMLHttpRequest, textStatus, errorThrown) { 
			//alert("Status: " + textStatus); alert("Error: " + errorThrown); 
			 $('#loginform').prepend("<b>ENTER VALID USERNAME OR PASSWORD</b>");
		}     
			});	
		 
			
			
		 
		 
		}
	  });
	  return new SessionModel();

	});
