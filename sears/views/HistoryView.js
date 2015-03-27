define([
    "app",
    "text!templates/gameHistory.html",
    "text!templates/login-page.html",
    "parsley",
    "utils"
    ], function(app,GameHistoryTpl,LoginPageTpl){

        var HistoryView = Backbone.View.extend({

            initialize: function () {

                _.bindAll(this);
                app.session.on("change:logged_in", this.render);
            },
            
            events : {
              
                'click .resume' : 'getResume'
                
            },

            template : _.template(GameHistoryTpl),
           
            getResume : function(e){
                
                var self = this;
                var id = e.currentTarget.id;
                
                $.ajax({
                    type: "POST",
                    url: "api/getUncompleteGame.php?id="+id,

                })
                .done(function(msg ) {

                      playedGame = JSON.parse(msg);
                      //console.log(playedGame);
                    
                    
                      self.model.set({$id:id,id:id,group_id:playedGame.groupId,group_game_id:playedGame.group_game_id,number_of_picks:playedGame.picks,interval:playedGame.interval,expectation:playedGame.expectation,submitImage:playedGame.submitImage,face:playedGame.face,current_count:playedGame.cc});
                      self.model.trigger("change");
                      console.log(self.model);
                  
                     app.router.navigate("play", { trigger : true, replace : false } ); 
      
          }); 
                
                
                
                alert(id);  
            }, 
           
            render : function(){
                
                var that = this ; 
                
                $.ajax({
                    type: "POST",
                    url: "api/getUncompleteGame.php",

                })
                .done(function(msg ) {

                    games = JSON.parse(msg);
                    
                    console.log(games);
                    
                if(app.session.get('logged_in')){ 
                    
                    that.template = _.template(GameHistoryTpl,games);
                    that.$el.html(that.template);   

                }else {
                    that.template = _.template(LoginPageTpl); 
                    that.$el.html(that.template);
                }
      
          }); 

                
                

               

                
               
           return this;
      }
         
        });

        return HistoryView;
});


