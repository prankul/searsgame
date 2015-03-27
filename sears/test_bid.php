<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.js"></script> 
<script src="http://searsgame.91webagency.com/js/TweenMax.js"></script> 
 
<script>

    $(document).ready(function(){
        
        var i,
        dot,
        quantity = 100, //number of dots
        duration = 5,  //duration (in seconds)
        top = 0,
        left = 0
        path = [{x:0,y:-200},{x:200,y:0},{x:0,y:200},{x:-200,y:0},{x:0,y:-200}], //points on the path (BezierPlugin will plot a Bezier through these). Adjust however you please.
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

        for (i = 0; i <= quantity; i++) {
            tween.time(i); //jumps to the appropriate time in the tween, causing position.x and position.y to be updated accordingly.

            dot = $("<div />", {id:"dot"+i}).addClass("dot").css({left:position.x+"px", top:position.y+"px"}).appendTo("body").html(i); //create a new dot, add the .dot class, set the position, and add it to the body.

            tl.set(dot, {visibility:"visible", rotation:position.rotation}, i * (duration / quantity)); //toggle the visibility on at the appropriate time.
        }



    })


</script>
<style>

  
    .dot{
        position: absolute;
        width: 10px;
        height: 20px;
        background-color: #91e600;

        visibility:hidden;
        margin-left:25%;
        margin-top:25%;
    }

</style>
   