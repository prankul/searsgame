define([
    "app",
    "text!templates/startGameTemplate.html",
    "text!templates/gameTemplate.html",
    "text!templates/login-page.html",
    "models/ExpectationModel",
    "parsley",
    "utils"
    ], function(app,GameTpl,GroupGameTpl,LoginPageTpl,ExpectationModel){

        var ExpectationView = Backbone.View.extend({

            initialize: function () {
                _.bindAll(this);

                // Listen for session logged_in state changes and re-render
                // app.session.on("change:logged_in", this.render);

                // this.model.on('change', this.render, this);
            },

            events: {
                'click #play': 'saveExpectation',
                "change .game_typeJQ": "gameSelected"  

            },

            gameSelected: function(e){
                 
                var goal_select_options = '';
                var expectations_cnt = e.target.value;
                var interval = $('#'+e.target.value).val();
                ;
                var expectation_array = [];

                $("."+e.target.value).each(function() {

                    expectation_array.push($(this).val());
                });  
                
                var submitImage =  $('#submitImage'+expectations_cnt).val();     

                // dynamic face allocation
                
                
                $('.expectation_container').empty();
                for(var i=1; i <= expectations_cnt; i++){

                    app.newGame.set({interval:interval,face:expectations_cnt,expectation:expectation_array,submitImage:submitImage});
                    $('.expectation_container').append("<div class='form-group'><input type='hidden' class='form-control c91_expectation' id='expectation["+i+"]' placeholder='Expectation "+i+"' name='expectation["+i+"]' value='"+expectation_array[i-1]+"' required></div>");

                }

            },


            render:function () {

             
               

                    var self = this;
                    //  var group_id = this.model.get("group_id"); 

                    var gameFace = app.newGame.get("face");

                    var game;
                    $.ajax({
                        type: "POST",
                        url: "api/getGameList.php?face="+gameFace,

                    })
                    .done(function(msg ) {

                           game = JSON.parse(msg);
                   
                           
                         if(self.model.get("group_game_id") != 0 ){
                            
                            self.model.set({expectation:game[0].expectation,interval:game[0].interval,submitImage:game[0].submitImage});  
                             
                     if(app.session.get('logged_in')) self.template = _.template(GroupGameTpl,{face:self.model.get("face"),picks:self.model.get("number_of_picks")});
                    else 
                        self.template = _.template(LoginPageTpl); 

                    self.$el.html(self.template);  

                }else 
                {
                   
                        if(app.session.get('logged_in')) self.template = _.template(GameTpl,{game:game});
                        else 
                            self.template = _.template(LoginPageTpl); 

                        self.$el.html(self.template);  
                 }
                    }); 
                 
                           return this;
            },

            saveExpectation : function(opts, callback, args){


                if(this.$("#game-form").parsley('validate')){
                    window.check=0; 
                    var self = this;
                    var expactation = new ExpectationModel();
                    var expectation_array = [];


                    $(".c91_expectation").each(function() {

                        expectation_array.push($(this).val());
                    });        

                    var n = $("#number_of_picks").val();    
                    var goal = $("#goal").val();
                    
                    
                    
                    if(n!="" && n!=undefined)
                     { 
                       
                       app.newGame.set({number_of_picks:n});
                       
                       this.model.trigger("change");
                       
                     }  
                     
                     
                    
                    app.router.navigate("play", { trigger : true, replace : false } ); 

                } else {
                    // Invalid clientside validations thru parsley
                    if(DEBUG) console.log("Did not pass clientside validation");

                }
            }   

        });

        return ExpectationView;
});
