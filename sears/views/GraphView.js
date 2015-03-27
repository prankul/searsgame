define([
    "app",
    "text!templates/graphTemplate.html",
    "text!templates/login-page.html",
    "parsley",
    "utils"
    ], function(app,GraphTpl,LoginPageTpl){

        var GraphView = Backbone.View.extend({

            initialize: function (groupGameId) {

                _.bindAll(this);

                this.groupGameId = groupGameId.groupGameId;

                app.session.on("change:logged_in", this.render);
            },
            events: {

                /* 'click #submit-group': 'saveGroup',
                'click .member-list':'memberList'*/
                'click #sendResult' : 'sendResult'

            }, 


            sendResult : function(e){

                var self = this;

                var thisId = e.currentTarget.parentNode.id;

                var Pic = document.querySelector('#groupChart').toDataURL();
                Pic = Pic.replace(/^data:image\/(png|jpg);base64,/, "")
                alert(Pic);
                // Sending the image data to Server
                $.ajax({
                    type: 'POST',
                    url: 'sendResult.php',
                    data: '{ "imageData" : "' + Pic + '" }',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    success: function (msg) {
                        alert("Done, Picture Uploaded.");
                    }
                }); 



                //var jsonData = JSON.parse(thisId);  

                $.ajax({

                    url: 'api/sendResult.php?id='+thisId,
                    dataType: "json",
                    success: function(result) {

                        // Do something with the result
                    }
                });  


            },

            myGraph : function(){

                /*var groupId = this.model.get("group_id");*/

                var self = this;

                $.ajax({
                    type: "POST",
                    url: "api/myResult.php",

                })
                .done(function(msg ) {

                    //group graph

                    var str =  JSON.parse(msg);

                    for(var i=0;i<str.length;i++){



                        $('#groupChart').append("<div style='height:300px; width:1000px;' id=groupGraph"+i+"></div>");          
                        /*$('#userName'+i).append(str[i].name);            */
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

                        var resultArray = str[i].resultString;
                        var goalArray = str[i].goalString;

                        var expectation = str[i].expectation;
                        var counts = [];
                        var goalCounts = [];

                        for(var j = 1; j<= resultArray.length; j++) {
                            var num = resultArray[j-1];
                            counts[num] = counts[num] ? counts[num]+1 : 1;

                        } 
                        

                        $('#groupChart').append("<div class='game_summary' id='summary"+i+"'>");

                        $('#summary'+i).append("<span class='expectation'>"+str[i].time+"</span>");  

                        for(var k = 1; k< counts.length; k++) {


                            if(counts[k]==undefined)
                            {
                                counts[k] = 0;  
                            } 
                            var perc = (counts[k]*100)/resultArray.length;

                            $('#summary'+i).append("<span class='expectation'>"+expectation[k-1]+":"+perc.toFixed(2));
                            $('#summary'+i).append("</span>"); 
                        } 





                    } 



                });



            },

            groupGraph : function(){

                $.ajax({
                    type: "POST",
                    url: "api/getGroupResultMultiplier.php",
                    data: { group_game_id:this.groupGameId }
                })
                .done(function(msg ) {



                    $('#groupChart').append("<span class='multiplier_result'>Group Result:"+msg+"%</span>")   ;          

                    /*var groupId = this.model.get("group_id");*/


                });

                $.ajax({
                    type: "POST",
                    url: "api/getGroupResult.php",
                    data: { group_game_id:this.groupGameId }
                })
                .done(function(msg ) {

                    //group graph

                    var str =  JSON.parse(msg);

                    for(var i=0;i<str.length;i++){

                        $('#groupChart').append("<span class='c91_member' id='userName"+i+"'></span><div style='height:300px; width:1000px;' id=groupGraph"+i+"></div>");          
                        $('#userName'+i).empty();
                        $('#userName'+i).append("Result for "+str[i].name);            
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

                        var resultArray = str[i].resultString;
                        var goalArray = str[i].goalString;

                        var expectation = str[i].expectation;
                        var counts = [];
                        var goalCounts = [];

                        for(var j = 1; j<= resultArray.length; j++) {
                            var num = resultArray[j-1];
                            counts[num] = counts[num] ? counts[num]+1 : 1;

                        } 

                        console.log(counts);
                        console.log(counts.length);
                        console.log(resultArray.length);

                        $('#groupChart').append("<div class='game_summary' id='summary"+i+"'>");

                        $('#summary'+i).append("<span class='expectation'>"+str[i].time+"</span>"); 


                        for(var k = 1; k< counts.length; k++) {


                            if(counts[k]==undefined)
                            {
                                counts[k] = 0;  
                            } 

                            var perc = (counts[k]*100)/resultArray.length;
                            var actualPerc = perc.toFixed(2); 

                            $('#summary'+i).append("<span class='expectation'>"+expectation[k-1]+":"+perc.toFixed(2));
                            $('#summary'+i).append("</span>"); 
                        }



                    } 

                });






            }, 


            render : function(){

                var that = this ;

                if(typeof(this.groupGameId)!="undefined" && this.groupGameId!="")
                {

                    if(app.session.get('logged_in')){ 



                        that.template = _.template(GraphTpl);

                    }else
                        that.template = _.template(LoginPageTpl); 

                    that.$el.html(that.template);


                    this.groupGraph();



                }else{

                    if(app.session.get('logged_in')){ 

                        that.template = _.template(GraphTpl);

                    }else
                        that.template = _.template(LoginPageTpl); 

                    that.$el.html(that.template);


                    this.myGraph();


                }


                return this;
            }

        });

        return GraphView;
});


