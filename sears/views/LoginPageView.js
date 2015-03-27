define([
    "app",
    "text!templates/logged-in-page.html",
    "text!templates/login-page.html",
    "parsley",
    "utils"
    ], function(app, LoggedInPageTpl, LoginPageTpl){

        var LoginView = Backbone.View.extend({

            initialize: function (invitation) {
                _.bindAll(this);

                this.invitation = invitation.invitation; 


                // Listen for session logged_in state changes and re-render
                app.session.on("change:logged_in", this.render);
            },

            events: {
                'click #login-btn'                      : 'onLoginAttempt',
                'click #signup-btn'                     : 'onSignupAttempt',
                'keyup #login-password-input'           : 'onPasswordKeyup',
                'keyup #signup-password-confirm-input'  : 'onConfirmPasswordKeyup',
                'click #forgot-pwd' : 'forgot_password'
            },

            forgot_password: function(){

                app.router.navigate("forgotpwd", { trigger : true, replace : false } );
            },

            // Allow enter press to trigger login
            onPasswordKeyup: function(evt){
                var k = evt.keyCode || evt.which;

                if (k == 13 && $('#login-password-input').val() === ''){
                    evt.preventDefault();    // prevent enter-press submit when input is empty
                } else if(k == 13){
                    evt.preventDefault();
                    this.onLoginAttempt();
                    return false;
                }
            },

            // Allow enter press to trigger signup
            onConfirmPasswordKeyup: function(evt){
                var k = evt.keyCode || evt.which;

                if (k == 13 && $('#confirm-password-input').val() === ''){
                    evt.preventDefault();   // prevent enter-press submit when input is empty
                } else if(k == 13){
                    evt.preventDefault();
                    this.onSignupAttempt();
                    return false;
                }
            },

            onLoginAttempt: function(evt){


                /*start*/
                /* function getUrlParameters(parameter, staticURL, decode){

                var currLocation = (staticURL.length)? staticURL : window.location,
                parArr = currLocation.split("?")[1].split("&"),
                returnBool = true;

                for(var i = 0; i < parArr.length; i++){
                parr = parArr[i].split("=");
                if(parr[0] == parameter){
                return (decode) ? decodeURIComponent(parr[1]) : parr[1];
                returnBool = true;
                }else{
                returnBool = false;            
                }
                }

                if(!returnBool) return false;  
                }*/ /*end*/

                // var url = window.location.href;  

                var groupId = null;

                if(this.invitation!=undefined)
                    groupId = this.invitation;

                if(evt) evt.preventDefault();

                if(this.$("#login-form").parsley('validate')){
                    app.session.login({
                        username: this.$("#login-username-input").val(),
                        password: this.$("#login-password-input").val(),
                        groupId : groupId
                        }, {
                            success: function(mod, res){
                                if(DEBUG) console.log("SUCCESS", mod, res);

                            },
                            error: function(err){
                                if(DEBUG) console.log("ERROR", err);
                                //app.showAlert('Invalid Email-id or Password', err.error, 'alert-danger'); 
                                app.showAlert('Invalid Email-id or Password','', 'alert-danger'); 
                            }
                    });
                } else {
                    // Invalid clientside validations thru parsley
                    if(DEBUG) console.log("Did not pass clientside validation");

                }
            },


            onSignupAttempt: function(evt){


                var groupId = null;

                if(this.invitation!=undefined)
                    groupId = this.invitation;


                if(evt) evt.preventDefault();
                if(this.$("#signup-form").parsley('validate')){
                    app.session.signup({
                        username: this.$("#signup-emailID-input").val(),
                        password: this.$("#signup-password-input").val(),
                        emailid : this.$("#signup-emailID-input").val(),
                        name: this.$("#signup-name-input").val(),
                        invitationId : groupId


                        }, {
                            success: function(mod, res){
                                if(DEBUG) console.log("SUCCESS", mod, res);
                                app.showAlert('Great!!! Signed-Up successfully,please Confirm and Activate your account from your emailid','',"alert-success");
                            },
                            error: function(err){
                                if(DEBUG) console.log("ERROR", err);
                                app.showAlert('Uh oh!', err.error, 'alert-danger'); 
                            }
                    });
                } else {
                    // Invalid clientside validations thru parsley
                    if(DEBUG) console.log("Did not pass clientside validation");

                }
            },

            loadFb:function(){

                /* <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
                </fb:login-button>

                <div id="status">        */

            },

            render:function () {

                if(app.session.get('logged_in')) 
                    this.template = _.template(LoggedInPageTpl);
                else 
                    this.template = _.template(LoginPageTpl); 

          
                this.$el.html(this.template({ 
                    user: app.session.user.toJSON() 
                }));
                return this;
            }


        });

        return LoginView;
});

