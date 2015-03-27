define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/login/loginTemplate.html'
    ], function($, _, Backbone, loginTemplate){

        var LoginView = Backbone.View.extend({
            el: $("#page"),

            events: {
                "click #loginButton": "login"
            },
			
			 login:function (event) {
        event.preventDefault(); // Don't let this button submit the form
        $('.alert-error').hide(); // Hide any errors on a new submit
        var url = 'api/index.php';
        console.log('Loggin in... ');
        var formValues = {
            userName: $('#userName').val(),
            password: $('#password').val()
        };

        $.ajax({
            url:url,
            type:'POST',
            dataType:"json",
            data: formValues,
            success:function (data) {
                console.log(["Login request details: ", data]);
               
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
    },
			
            render: function(){

					this.$el.html(loginTemplate);
				}

        });

        return LoginView;

});
