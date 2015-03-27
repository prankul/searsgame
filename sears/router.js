/**
* @desc        backbone router for pushState page routing
*/

define([
    "app",

    "models/SessionModel",
    "models/UserModel",
    "models/GameModel",

    "views/HeaderView",
    "views/LoginPageView",
    "views/GameView",
    "views/ExpectationView",
    "views/GroupView",
    "views/MemberListView",
    "views/GraphView",
    "collection/GroupCollection",
    "collection/GroupGameCollection",
    "collection/UserCollection",
    "views/GroupOverView",
    "views/BidChainView",
    "views/HistoryView",
    "views/ForgotPwdView",
    "utils"
    ], function(app,SessionModel,UserModel,GameModel,HeaderView,LoginPageView,GameView,ExpecationView,GroupView,MemberListView,GraphView,GroupCollection,GroupGameCollection,UserCollection,GroupOverView,BidChainView,HistoryView,ForgotPwdView){

        var WebRouter = Backbone.Router.extend({

            initialize: function(){

                _.bindAll(this);
            },

            routes: {


                "" : "index",
                "invitation=:n": "index",
                "startGame"       : "game", 
                "startGame?groupGameid=:n" : "game", 
                "groups"          : "group",
                "settings"        : "settings",
                "play"            : "play",
                "memberList?id=:n" : "memberList",
                "result" :  "showGraph",
                "groupGraph=:n":"showGroupGraph",
                "groupOverview?groupId=:n" : "groupOverview",
                "bidchain" : "showBidChain",
                "history" : "history",
                "forgotpwd": "forgotpwd",     
                "logout" : "logout" 

                //"login"         : "login"
            },

            


            show: function(view, options){

                // Every page view in the router should need a header.
                // Instead of creating a base parent view, just assign the view to this
                // so we can create it if it doesn't yet exist
                if(!this.headerView){
                    this.headerView = new HeaderView({});
                    this.headerView.setElement( $(".header") ).render();
                }



                // Close and unbind any existing page view
                // if(this.currentView) this.currentView.close();

                // Establish the requested view into scope
                this.currentView = view;

                var sPageURL = window.location.href;
                var value;
                var sURLVariables = sPageURL.split('#');
                for (var i = 0; i < sURLVariables.length; i++) 
                {
                    var sParameterName = sURLVariables[i].split('=');

                    if (sParameterName[0] == "invitation") 
                    {
                        value = sParameterName[1];
                    }
                }

                         

                // Need to be authenticated before rendering view.
                // For cases like a user's settings page where we need to double check against the server.
                if (typeof options !== 'undefined' && options.requiresAuth){        
                    var self = this;
                    
                        console.log("in forgot pwd");
                    
                    app.session.checkAuth({
                        success: function(res){
                            // If auth successful, render inside the page wrapper

                            $('#content').html( self.currentView.render().$el);
                        }, error: function(res){
                            self.navigate("/", { trigger: true, replace: true });
                        }
                    });

                } else {
                    // Render inside the page wrapper
                    // console.log(this.currentView.render().$el); 
                         console.log("in else forgot pwd");
                    $('#content').html(this.currentView.render().$el);

                    //this.currentView.delegateEvents(this.currentView.events);        // Re-delegate events (unbound when closed)
                }

            },
            logout:function(){

                this.show( new LoginPageView({}));
            },

            index: function() {

                /* code to get parameter $.urlParam = function(name){
                var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
                return results[1] || 0;
                }       */


                /* if($.urlParam('invitationId')!=undefined)  
                var invitationId = $.urlParam('invitationId'); // name
                //alert(invitationId);
                */   

                // Fix for non-pushState routing (IE9 and below)
                var hasPushState = !!(window.history && history.pushState);
                if(!hasPushState) this.navigate(window.location.pathname.substring(1), {trigger: true, replace: true});
                else {
                    if(arguments[0]!=undefined)  
                        this.show( new LoginPageView({invitation:arguments[0]}));
                    else
                        this.show( new LoginPageView({}));  
                }                

            },

            groupOverview : function(){

                this.groupGameList = new GroupGameCollection();
                var self = this;    

                var argument = app.groupGame.get("groupId");

                if(argument==0)
                {
                    argument = arguments[0];
                    app.groupGame.set({groupId:argument,is_admin:true});
                }
       

                this.groupGameList.fetch({traditional:true,data:{groupId: argument} }).always(function(res,mod) {

                    self.groupGameList.set(res);

                    self.show(new GroupOverView({collection:self.groupGameList,groupId:argument}));


                });;


            },

            showGraph : function(){

                var self = this;
                self.show(new GraphView({}));

            },
            showGroupGraph: function(queryString){

                var argument = arguments[0];   
                
                var self = this; 
                self.show(new GraphView({groupGameId:arguments[0]}));  
            },


            memberList: function(queryString){

                var argument = arguments[0];   

                this.memberList = new UserCollection();
                var self = this;    

                this.memberList.fetch({traditional:true,data:{groupId: arguments[0]} }).always(function(res,mod) {

                    self.memberList.set(res);

                    self.show(new MemberListView({collection:self.memberList,groupId:argument}));


                });;


            },

            group: function(){

                this.groupList = new GroupCollection();
                var self = this;



                this.groupList.fetch({
                    success:function (res,mod) {


                        self.groupList.set(mod);
                        self.show(new GroupView({collection:self.groupList}));
                    },
                    error : function(){

                        self.groupList.set([]); 
                        console.log("No groups"); 
                        self.show(new GroupView({collection:self.groupList}));
                    }
                });

                //self.show(new GroupView({collection:self.groupList}));

            },

            game: function(){


                var argument = arguments[0];   
                //app.newGame = new GameModel();

                if(argument != undefined){

                    app.newGame.set({group_id:argument});
                }

                this.show(new ExpecationView({model:app.newGame}));
            },

            play: function(){

                console.log(app.newGame);
                
               var game = new GameView({model: app.newGame});    
                this.show(game);

                // initial call
                game.showExpectation();


            },
            showBidChain : function(){
                
               this.show(new BidChainView());
                 
            },
            history : function(){
                
               this.show(new HistoryView({model:app.newGame}));
                 
            },forgotpwd: function(){
              
                this.show(new ForgotPwdView());  
                
            }   
            



        });

        return WebRouter;

});
