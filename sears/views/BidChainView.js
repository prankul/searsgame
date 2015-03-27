define([
    "app",
    "text!templates/bidchain.html",
    "text!templates/login-page.html",
    "parsley",
    "utils"
    ], function(app,BidChainTpl,LoginPageTpl){

        var BidChainView = Backbone.View.extend({

            initialize: function (groupGameId) {

                _.bindAll(this);


                app.session.on("change:logged_in", this.render);
            },

            template : _.template(BidChainTpl),

            showBidChain : function(){

                $.ajax({
                    type: "POST",
                    url: "api/getBead.php",

                })
                .done(function(msg ) {

                    beads = JSON.parse(msg);
                    console.log(beads); 




                    for(var j=0;j<beads.length;j++){


                        $(".chain").append( "<div class='beadchainClass slide' id='beadchain"+j+"'></div>");

                        console.log("q"+(Math.floor(beads[j].resultString.length) / 100));

                        var i,
                        dot,
                        quantity = ((Math.floor((beads[j].resultString.length-1) / 100)+1)*100), //number of dots
                        duration = 5,  //duration (in seconds)
                        top = 0,
                        left = 0
                        path = [{x:0,y:-200},{x:200,y:0},{x:0,y:320},{x:-200,y:0},{x:0,y:-200}], //points on the path (BezierPlugin will plot a Bezier through these). Adjust however you please.
                        position = {x:path[0].x, y:path[0].y}, //tracks the current position, so we set it initially to the first node in the path. It's the target of the tween.
                        tween = TweenMax.to(position, quantity, 
                            {
                                bezier:
                                {
                                    values:path,
                                    curviness:1.5,
                                    autoRotate:true
                                },
                                ease:Linear.easeNone
                        }), //this does all the work of figuring out the positions over time.
                        tl = new TimelineMax(); //we'll use a TimelineMax to schedule things. You can then have total control of playback. pause(), resume(), reverse(), whatever.

                        //we can remove the first point on the path because the position is already there and we want to draw the Bezier from there through the other points
                        //path.shift();

                        var rightAns = beads[j].resultString.length; 

                        for (i = 0; i < beads[j].resultString.length; i++) {

                            var color = "green"; 

                            if(beads[j].resultString[i]!=beads[j].goalString[i]){

                                color = "red";
                                rightAns--;
                            }
                                

                            tween.time(i); //jumps to the appropriate time in the tween, causing position.x and position.y to be updated accordingly.

                            dot = $("<div />", {id:"dot"+i}).addClass("dot").css({left:position.x+"px", top:position.y+"px",'background-color':color}).appendTo("#beadchain"+j).html(i); //create a new dot, add the .dot class, set the position, and add it to the body.

                            tl.set(dot, {visibility:"visible", rotation:position.rotation}, i * (duration / quantity)); //toggle the visibility on at the appropriate time.


                        }
                        
                          
                        var perc = (rightAns*100)/beads[j].resultString.length;
                          
                        $("#beadchain"+j).append("<div>Face:"+beads[j].face+"<br>Overall Performance:"+perc.toFixed(2)+"%</div>");

                    }             


                    $('.bxslider').bxSlider({
                      
                       
                       /* auto: true,
                        autoControls: true   */


                    });


                }); 



            }, 

            render : function(){

                var that = this ;



                if(app.session.get('logged_in')){ 

                    that.template = _.template(BidChainTpl);
                    that.$el.html(that.template);   

                    setTimeout(function(){
                        that.showBidChain();
                        }, 2000); 

                }else {
                    that.template = _.template(LoginPageTpl); 
                    that.$el.html(that.template);
                }



                return this;
            }




        });

        return BidChainView;
});


