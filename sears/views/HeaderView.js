define([
    "app",
    "text!templates/header.html",
	"views/GroupView",
    "models/GameModel",
    "utils",
    "bootstrap"
], function(app, HeaderTpl,GroupView,GameModel){

    var HeaderView = Backbone.View.extend({

        template: _.template(HeaderTpl),

        initialize: function () {
            _.bindAll(this);

            // Listen for session logged_in state changes and re-render
            app.session.on("change:logged_in", this.onLoginStatusChange);
        },
        
        events: {
            "click #logout-link" : "onLogoutClick",
            "click #remove-account-link" : "onRemoveAccountClick",
			"click #start-game" : "onStartGame",
			"click #my-group" : "onGroup",
            "click #history" : "history"
			
        },	
      
	    history: function(){
            
          evt.preventDefault();
          app.router.navigate("history", { trigger : true, replace : false } );
            
        }, 
        
	    onGroup: function(evt){
	
		  evt.preventDefault();
		  app.router.navigate("groups", { trigger : true, replace : false } );
		 
		},
	    onStartGame: function(evt){
		  
          app.newGame = new GameModel();  
         
		  evt.preventDefault();
          app.router.navigate("startGame", { trigger : true, replace : false } );
		   
		}, 
	   
	   onLoginStatusChange: function(evt){
            this.render();
            if(app.session.get("logged_in")){ app.showAlert("Success!", "Logged in as "+app.session.user.get("username"), "alert-success");}  
            else app.showAlert("See ya!", "Logged out successfully", "alert-success");
        },

        onLogoutClick: function(evt) {
            
             evt.preventDefault();
            app.session.logout({});  // No callbacks needed b/c of session event listening
            app.router.navigate("logout", { trigger : true, replace : true } );
        },

        onRemoveAccountClick: function(evt){
           
            app.session.removeAccount({});
        },


        render: function () {
            
            console.log("user"+app.session.user.get("name"));
            
            if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            this.$el.html(this.template({ 
                logged_in: app.session.get("logged_in"),
                user: app.session.user.toJSON() 
            }));
            return this;
        }

    });

    return HeaderView;
});
