define([
    "app",
    "text!templates/memberListTemplate.html",
	"text!templates/login-page.html",
	"models/MemberModel",
  "models/InvitationModel",
  "parsley",
  "utils"
], function(app,MemberListTpl,LoginPageTpl,MemberModel,InvitationModel){


	
    var MemberListView = Backbone.View.extend({
		
      //console.log(arguments[0]);

		//el: $("#group"),  on other div,specify here
		template : _.template(MemberListTpl),
		
        initialize: function (options) {
                
                 

                _.extend(this, _.pick(options,"groupId"));

                

              _.bindAll(this);

               this.model = new MemberModel(); 

               this.model.on('change', this.render, this);

               this.model.bind("reset", this.render, this);
        
        /*this.model.bind("add", function (wine) {
            $(self.el).append(new WineListItemView({model:wine}).render().el);
        });*/
            // Listen for session logged_in state changes and re-render
            app.session.on("change:logged_in", this.render);
		
        },

        events: {

               /* 'click #submit-group': 'saveGroup',
                'click .member-list':'memberList'*/
                 'click .invite' : 'invitation',
                 'click .remove' : 'delete'
        },


        delete : function(e){

             //console.log(e.currentTarget.parentNode.id);
            
                var id = $("#groupId").text();
            
            
            
            this.model.set("groupId",id);
            this.model.set("id",e.currentTarget.id);

            

           // console.log(this.model.get("groupId"));

           // console.log(this.model.url());
            
           // this.collection.remove(this.model);
            this.model.destroy(this.model.url());
           // console.log("delete");
        },

       invitation : function(){

           if(this.$("#invite-form").parsley('validate')){
             var emailId = $("#emailId").val();
             var groupId = $(".invite").attr("id");

             var invitation = new InvitationModel();
              
              invitation.set("emailId",emailId);
              invitation.set("groupId",groupId);

              

              invitation.save();
              
              app.showAlert('Invitation has been send ','',"alert-success");
              
              

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

                        console.log("memberList view"+this.collection.toJSON());
                        
                         
                        this.template = _.template(MemberListTpl,{members:this.collection.toJSON(),groupId:this.groupId});
 
                    }else
                     this.template = _.template(LoginPageTpl); 

                    this.$el.html(this.template);

                    return this;

            return this;
        }
		


    });

    return MemberListView;
});

