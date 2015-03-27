define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/register/registerTemplate.html'
    ], function($, _, Backbone, registerTemplate){

        var RegistrationView = Backbone.View.extend({
            el: $("#page"),

            events: {
                "click #registerButton": "register"
            },
			
			 register:function (event) {
        event.preventDefault(); // Don't let this button submit the form
        $('.alert-error').hide(); // Hide any errors on a new submit
        var url = 'api/register.php';
        console.log('Register... ');
        var formValues = {
            name: $('#name').val(),
            email: $('#email').val(),
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
		 $('#main').prepend("<b>Regstration Done</b>");
		 $('#registerform').remove();
    }     
        });
    },
			
            render: function(){

					this.$el.html(registerTemplate);
				}

        });

        return RegistrationView;

});
