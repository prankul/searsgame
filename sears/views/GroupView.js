define([
    "app",
    "text!templates/groupTemplate.html",
    "text!templates/login-page.html",
    "text!templates/groupGraphTemplate.html",	
    "models/GroupModel",

    "parsley",
    "utils"
    ], function(app,GroupTpl,LoginPageTpl,groupGraphTmpl,GroupModel){


        var GroupView = Backbone.View.extend({

            //el: $("#group"),  on other div,specify here
            template : _.template(GroupTpl),

            initialize: function () {

                _.bindAll(this);

                this.model = new GroupModel(); 

                this.model.on('change',this.render, this);
                
                this.collection.on('change',this.render, this);
                this.collection.on('add',this.render,this);
                this.collection.on('remove',this.render,this);

                this.model.bind("reset", this.render,this);



                /*this.model.bind("add", function (wine) {
                $(self.el).append(new WineListItemView({model:wine}).render().el);
                });*/
                // Listen for session logged_in state changes and re-render
                app.session.on("change:logged_in", this.render);

            },

            events: {


                'click #submit-group': 'saveGroup',
                'click .member-list':'memberList',
                'click .removeGroup': 'removeGroup',
                'click .play':'play',
                'click .showgraph':'showGroupGraph',
                'click #group_overview' : 'group_overview',
                'click .change' : 'changeGroupName',
                'click #merge_group':'merge_group'



            },

            merge_group : function(e){

              var id = [];  
                $('input[name="group_chk"]:checked').each(function() {
                    id.push(this.value);
                }); 
                
             
                $.ajax({
                    url: 'api/mergeGroup.php',
                    method:"POST",
                    data:{id:id},
                    success: function(result) {
                        // Do something with the result
                        
                    }
                });           



            },

            hideText : function(e){


                var val = $(".edit_name").val(); 
                var id = $(".edit_name").attr("id");  

                $.ajax({
                    url: 'api/updateGroupName.php',
                    type: 'PUT',
                    data: {"id":id,"group_name":val}, 
                    dataType: "json",
                    success: function(result) {
                        // Do something with the result
                    }
                });


                $(".edit_name").replaceWith("<span id='"+id+"' class='change mygroup_name'>"+val+"</span>");  

            },

            changeGroupName : function(e){

                var arr = e.currentTarget.id;
                var name = $("."+arr).text();

                $(".edit_name").remove();

                $("#"+arr).remove();

                $("."+arr).append("<input class='edit_name' id="+arr+" type=text value='"+name+"'>");

                var self = this;
                $( ".edit_name" ).focus();
                $(".edit_name")
                .focusout(function() {

                    self.hideText();

                })


            },

            group_overview : function(e){

                var id = e.currentTarget.parentNode.id;
                //var    = e.currentTarget.parentNode.id;

                var is_remove = $('.removeGroup').text();


                if(typeof(is_remove)==undefined || is_remove == "" )
                {
                    app.groupGame.set({groupId:id,is_admin:false});


                }else
                { 
                    app.groupGame.set({groupId:id,is_admin:true});
                }  




                Backbone.history.navigate("groupOverview?groupId="+id, true); 


            },
            showGroupGraph : function(e){

                var id = e.currentTarget.parentNode.id;
                Backbone.history.navigate("groupGraph?groupGameId="+id, true); 

            },
            removeGroup : function(e){


                var id=e.currentTarget.id;
                var thisId = e.currentTarget.parentNode.id;
                //var jsonData = JSON.parse(thisId);  
                  var self = this;

                $.ajax({
                    url: 'api/saveGroup.php?id='+id,
                    type: 'DELETE',
                    dataType: "json",
                    success: function(result) {
                        
                        // Do something with the result
                        
                        self.collection.remove(self.model);
                       
                        
                        app.showAlert('Group has been Removed','',"alert-success");
                         
                    }
                });


            },
            memberList : function(e){


                var group_id = e.currentTarget.id;
                Backbone.history.navigate("memberList?id="+group_id, true); 
                //app.router.navigate("memberList?id="+1, { trigger : true, replace : false } ); 

            },

            play : function(e){

                var group_id = e.currentTarget.id;
                Backbone.history.navigate("startGame?groupid="+group_id, true); 

            },

            saveGroup : function(){

                if(this.$("#group-form").parsley('validate')){
                    var self = this; 

                    var group = new GroupModel();
                    var group_name = $("#group_name").val();
                    this.model.set("name",group_name);
                    this.model.save(null,
                        {
                            success : function(mod,res){

                                self.model.set("id",res._id);
                                self.collection.add(self.model);

                            }  , 
                            error: function(){

                                console.log("error in group view"); 
                            }    

                        } 

                    );
                }else{

                    console.log("group-name invalid");
                }    


                // app.router.navigate("play", { trigger : true, replace : false } ); 
            } ,

            render:function () {

                if(app.session.get('logged_in')){ 

                    this.template = _.template(GroupTpl,{groups:this.collection.toJSON()});

                }else
                    this.template = _.template(LoginPageTpl); 

                this.$el.html(this.template);

                return this;
               
            }



        });

        return GroupView;
});

