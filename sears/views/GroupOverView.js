define([
    "app",
    "text!templates/groupGameTemplate.html",
    "text!templates/login-page.html",
    "models/GroupGameModel.js",
    "parsley",
    "utils"
    ], function(app,GroupGameTpl,LoginPageTpl,GroupGameModel){



        var GroupOverView = Backbone.View.extend({

            //console.log(arguments[0]);

            //el: $("#group"),  on other div,specify here
            template : _.template(GroupGameTpl),

            initialize: function (options) {

                _.extend(this, _.pick(options,"groupId"));


                _.bindAll(this);

                this.model = new GroupGameModel();     

                this.model.on('change', this.render, this);

                this.collection.on('add',this.render,this);
                this.collection.on('remove',this.render,this);


                //  this.model.bind("reset", this.render, this);

                /*this.model.bind("add", function (wine) {
                $(self.el).append(new WineListItemView({model:wine}).render().el);
                });*/
                // Listen for session logged_in state changes and re-render
                app.session.on("change:logged_in", this.render);

            },

            events: {

                /* 'click #submit-group': 'saveGroup',
                'click .member-list':'memberList'*/
                'click .create_game' : 'create_game',
                'click .play' : 'play',
                'click .remove' : 'deleteI',
                'click .show-graph' : 'showGraph'

            }, 

            deleteI : function(e){

                //console.log(e.currentTarget.parentNode.id);

                //  this.model.set("groupId",e.currentTarget.id);
                this.model.set("_id",e.currentTarget.parentNode.id);



                this.collection.remove(this.model);
                //this.model.destroy(this.model.url());

                var self = this;

                var thisId = e.currentTarget.parentNode.id;
                //var jsonData = JSON.parse(thisId);  


                $.ajax({
                    url: 'api/saveGroupGame.php?id='+thisId,
                    type: 'DELETE',
                    dataType: "json",
                    success: function(result) {

                        // Do something with the result

                        app.showAlert('Group Game has been Removed','',"alert-success"); 

                        var self = self;

                        setInterval(function () {self.collection.remove(self.model);}, 3000);






                    }
                });

            },

            showGraph : function(e){


                var id = e.currentTarget.parentNode.id;
                app.router.navigate("groupGraph="+id,{trigger:true,replace:false}); 

            },

            play : function(e){

                var groupId = e.currentTarget.parentNode.parentNode.id;
                var groupGameId = e.currentTarget.parentNode.id;


                var  picks = e.currentTarget.lastChild.value;

                var gameFace = $("."+groupGameId).text();
                app.newGame.set({face:gameFace,group_game_id:groupGameId,group_id:groupId,number_of_picks:picks});
                app.router.navigate("startGame", { trigger : true, replace : false } );
            }  ,

            create_game : function(e){

                if(this.$("#create-game-form").parsley('validate')){

                    var groupId = $(".create_game").attr("id");
                    var gameName = $("#game_name").val();
                    var gameFace = $(".game_typeJQ").val();     
                    var picks = $("#picks").val();
                    var endDate = $("#datepicker").val();

                    this.model.set({gameName:gameName,gameFace:gameFace,groupId:groupId,picks:picks,endDate:endDate});
                    var self = this;
                    var id = null;
                    this.model.save(null,{ success : function(msg,res){


                        self.model.set("_id",res);
                        self.collection.add(self.model);
                        app.showAlert('New game created in the Group','',"alert-success");

                        },error: function(){
                            console.log("error in group view"); 
                        }  
                    } );




                }else {
                    // Invalid clientside validations thru parsley
                    if(DEBUG) console.log("Did not pass clientside validation");

                }

            },

            saveGroup : function(){



                var group = new GroupModel();
                var group_name = $("#group_name").val();

                this.model.set("name",group_name);
                this.model.save();

                // app.router.navigate("play", { trigger : true, replace : false } ); 
            } ,

            render:function () {     

                if(app.session.get('logged_in')){ 

                    var self = this;

                    $.ajax({
                        type: "POST",
                        url: "api/getGameList.php?face=0",

                    })
                    .done(function(msg ) {

                        gameList = JSON.parse(msg);
                        self.template = _.template(GroupGameTpl,{games:self.collection.toJSON(),groupId: app.groupGame.get("groupId"),is_admin:app.groupGame.get("is_admin"),gameList:gameList});
                        self.$el.html(self.template); 
                        $( "#datepicker" ).datepicker(

                            { 
                                dateFormat: 'mm-dd-yy',
                                constrainInput: false
                            }

                        );

                    }); 





                    //console.log("memberList view"+this.groupId);


                    //  this.template = _.template(GroupGameTpl);

                }else {
                    this.template = _.template(LoginPageTpl); 
                    this.$el.html(this.template);  

                } 


                return this;


            }



        });

        return GroupOverView;
});

