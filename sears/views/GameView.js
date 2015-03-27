define([
    "app",
    "text!templates/game.html",
    "text!templates/login-page.html",
    "models/ExpectationModel",
    "models/GameModel",
    "parsley",
    "utils"
    ], function(app,GameTpl,LoginPageTpl,ExpectationModel,GameModel){

        var GameView = Backbone.View.extend({

            //el:$("mydiv"),
            initialize: function () {
                _.bindAll(this);

                //*** change in model need this to reflect on view

                this.flag = true;

                this.model.on('change', this.render, this);
                this.model.on('change', this.showCounter, this);                
                this.model.on('change', this.showExpectation, this);   
                this.model.on('change', this.showGraph, this);      
                this.model.on('change', this.showMatrix, this); 

                if(this.model.get("group_id")!=undefined)  
                    this.model.on('change', this.groupGraph, this);                                                                
                this.arr= [];
                this.goal= [];   

                
               
                // Listen for session logged_in state changes and re-render
                app.session.on("change:logged_in", this.render);
            },

            events: {

                'click #toss': 'getResult',
                'click #finalResult': 'result',
                'click #donotSaveResult': 'deleteResult'


            },

            deleteResult : function(){

                var id = this.model.get("$id");
                $.ajax({
                    url: 'api/deleteResult.php?id='+id,
                    type: 'DELETE',
                    dataType: "json",
                    success: function(result) {
                        // Do something with the result
                    }
                });

            },
            result : function(){

                var groupGameId = this.model.get("group_game_id");

                if(groupGameId!=0 && groupGameId!=undefined)
                    app.router.navigate("groupGraph?groupGameId="+groupGameId, { trigger : true, replace : false } );
                else
                    app.router.navigate("result", { trigger : true, replace : false } );

            },

            showExpectation: function(){

                var expectation = this.model.get("expectation");   
                var length = expectation.length;


                $('#myexpectation').empty();
                for(var j = 0,k=j+1;j < length;j++,k++){

                    $('#myexpectation').append("<div class='form-group'><lable>"+expectation[j]+"</lable><lable class='newRadio'><input name=exp type='radio' value="+k+" id='e1' class='form-control c91_expectation' id="+j+" required><img class='exp-image' src='img/"+expectation[j]+".jpg'></lable></div>");
                }

                $(".exp-image").click(function(){
                    
                    $(".c91_expectation").prop('checked',false);
                    $(this).prev().prop('checked',true);
                })


            },

            popup : function(e){

                // $('popupBasic').show();
                //$('#popupBasic').popup('open')

                var options = {
                    "backdrop" : "static"
                }; 

                $('#basicModal').modal(options);
        
            },

            showCounter : function(e){
                
                var cnt = this.model.get("current_count");   
                var picks = this.model.get("number_of_picks");  

                var showcnt ;
                showcnt = picks - cnt;

                if(showcnt <= 0 && this.flag)
                {    
                    $('#counter').css( "visibility",'visible' );
                    $('#counter').append("Remaining Throws : 0");
                    $('#myexpectation').remove();
                    $('#toss').remove();

                    $('#finalResult').show();
                    $('#finalResult').text("Get Final Result");
                    var id = this.model.get("id");
                    var self = this;
                    console.log(this.model);
                    this.model.save({id:id},{success : function(){

                        self.popup();
                        }
                    });
                 
                    this.flag = false;

                }else    
                { 
                    $('#counter').css( "visibility",'visible' );
                    $('#counter').append("Remaining Throws : "+showcnt);
                }  
                
                if(cnt%this.model.get("interval")==0 && cnt!=0){

                    //save state
                    app.showAlert('Next Phase Get Start','',"alert-success");

                }  
       
            },
            showMatrix : function(e){


                var goal = this.model.get("goal");
                var result = this.model.get("result");         

                console.log(this.model.get("expectation")[0]);
                
                var len = 0;
                if(goal!=undefined)
                    len = goal.length;

                // $('#matrix-table').empty();

                for(var j = 0;j < len;j++){

                    if(goal[j]==result[j]){
                        color = "green";  
                        string = "&#10004;";
                    }  
                    else {
                        
                        color = "red";  
                        string = "&times;";
                    }
                        


                    $('#matrix-table').append("<tr><td>"+(j+1)+"</td><td>"+this.model.get("expectation")[goal[j]-1]+"</td><td>"+this.model.get("expectation")[result[j]-1]+"</td><td><span style='color:"+color+ ";'>"+string+"</span></td></tr>");


                }

            },
            getResult : function(e){
                if(this.$("#game-form").parsley('validate')){

                    var newIdReturnedAfterSave;
                    var mygoal = parseInt($( "input:radio[name=exp]:checked" ).val());

                    // local counter for interval

                    if(app.newGame.get("expectation")!=undefined) 
                        var expectation = app.newGame.get("expectation"); 
                    else
                        var expectation = [];  

                    var len = expectation.length;

                    rand = Math.floor((Math.random() * len) + 1);     




                    var cc = app.newGame.get("current_count")%this.model.get("interval");

                    /** interval logic start **/
                    var cnt = this.model.get("current_count");


                    if(cnt%this.model.get("interval")==0 && cnt!=0){
                                  
                        var self = this;
                        this.model.save({ id: self.model.get('id') },{

                            success : function(model,response){

                                newIdReturnedAfterSave = model.get("$id");
                                // self.model.set({id:model.get("$id")})
                            }

                        });
                        cc = 0;
                        this.arr = [];
                        this.goal = [];

                    }

                    //console.log(this.model);
                    /** interval logic ends **/


                    this.arr[cc] = rand;
                    this.goal[cc] = mygoal;            


                    cc = cc + 1;
                    cnt = cnt + 1;     


                    /** maintaining global counter  */

                    app.newGame.set({id:newIdReturnedAfterSave,current_count:cnt,result:this.arr,goal:this.goal}); 

                    var expectation = this.model.get("expectation");   
                }

                /* this.showExpectation();
                this.showMatrix();
                if(this.model.get("group_id")!="")
                this.groupGraph(); 

                this.showGraph();*/
            },

            groupGraph : function(){

                var groupId = this.model.get("group_id");
                var face = this.model.get("face");
                var group_game_id = this.model.get("group_game_id");

                $.ajax({
                    type: "POST",
                    url: "api/getGroupResult.php",
                    data: { groupId:groupId,face:face,group_game_id:group_game_id }
                })
                .done(function(msg ) {

                    //group graph

                    var str =  JSON.parse(msg);

                    for(var i=0;i<str.length;i++){

                        $('#groupChart').append("<span class=\"c91_groupGraph\" id='userName"+i+"'></span><div style='height:300px; width:1000px;' id=groupGraph"+i+"></div>");          
                        $('#userName'+i).empty();
                        $('#userName'+i).append(str[i].name);            
                        var cosPoints = str[i].resultString;
                        var sinPoints = str[i].goalString;
                        // Some simple loops to build up data arrays.

                        var plot3 = $.jqplot('groupGraph'+i, [cosPoints, sinPoints], 
                            { 
                                title:'Line Style Options', 
                                // Series options are specified as an array of objects, one object
                                // for each series.
                                series:[ 
                                    {
                                        // Change our line width and use a diamond shaped marker.
                                        lineWidth:2, 
                                        markerOptions: { style:'dimaond' }
                                    }, 
                                    {
                                        // Don't show a line, just show markers.
                                        // Make the markers 7 pixels with an 'x' style
                                        showLine:false, 
                                        markerOptions: { size: 7, style:"x" }
                                    },
                                    { 
                                        // Use (open) circlular markers.
                                        markerOptions: { style:"circle" }
                                    }, 
                                    {
                                        // Use a thicker, 5 pixel line and 10 pixel
                                        // filled square markers.
                                        lineWidth:5, 
                                        markerOptions: { style:"filledSquare", size:10 }
                                    }
                                ]
                            }
                        );  

                    } 



                });



            },

            showGraph:function(){

                var newGoal = [];

                if(this.model.get("goal")!=undefined){

                    newGoal = this.model.get("goal");
                    result = this.model.get("result");
                }  



                var goalLength = newGoal.length;   

                var goalGraphArray = [];
                var resultGraphArray = [];

                for(var i=0;i < goalLength;i++){

                    goalGraphArray[i] = [i+1,newGoal[i]];
                    resultGraphArray[i] = [i+1,result[i]];                        
                }


                var cosPoints=goalGraphArray;
                var sinPoints=resultGraphArray;

                // Some simple loops to build up data arrays.

                var plot3 = $.jqplot('chart3', [cosPoints, sinPoints], 
                    { 
                        title:'Line Style Options', 
                        // Series options are specified as an array of objects, one object
                        // for each series.
                        series:[ 
                            {
                                // Change our line width and use a diamond shaped marker.
                                lineWidth:2, 
                                markerOptions: { style:'dimaond' }
                            }, 
                            {
                                // Don't show a line, just show markers.
                                // Make the markers 7 pixels with an 'x' style
                                showLine:false, 
                                markerOptions: { size: 7, style:"x" }
                            },
                            { 
                                // Use (open) circlular markers.
                                markerOptions: { style:"circle" }
                            }, 
                            {
                                // Use a thicker, 5 pixel line and 10 pixel
                                // filled square markers.
                                lineWidth:5, 
                                markerOptions: { style:"filledSquare", size:10 }
                            }
                        ]
                    }
                );  




            },

            render:function () {



                //this.showCounter();
                if(app.session.get('logged_in'))
                 {
                   this.template = _.template(GameTpl,{submitImage:this.model.get("submitImage")});
                 }
                else 
                    this.template = _.template(LoginPageTpl); 

                this.$el.html(this.template);
                
                  

                return this;
            }


        });

        return GameView;
});
