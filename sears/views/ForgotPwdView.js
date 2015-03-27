define([
    "app",
    "text!templates/forgotPwd.html",
    "text!templates/login-page.html",
    "models/ExpectationModel",
    "models/GameModel",
    "parsley",
    "utils"
    ], function(app,forgotPwdTpl,LoginPageTpl,ExpectationModel,GameModel){    


        var ForgotPwdView = Backbone.View.extend({

            initialize: function () {

                _.bindAll(this);

            },

            events: {

                'click #go': 'getPassword',

            }, 

            getPassword: function(){

                var emailId = this.$("#emailId").val();
                $.ajax({

                    url: 'api/forgotPwd.php?emailId='+emailId,
                    dataType: "json",
                    success: function(result) {

                        // Do something with the result
                        app.router.navigate("", { trigger : false, replace : true } );
                        app.showAlert('New Password has been send on your emailid','',"alert-success");
                    }
                });


            },

            render:function () {

                this.template = _.template(forgotPwdTpl);
                this.$el.html(this.template);
                return this;
            }


        }); 

        return ForgotPwdView;

});
