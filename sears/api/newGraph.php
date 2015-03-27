
  
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>

<script language="javascript" type="text/javascript" src="http://www.selfcareindia.com/js/plugins/excanvas.js"></script>
<script language="javascript" type="text/javascript" src="http://www.selfcareindia.com/js/plugins/jquery.jqplot.min.js"></script>
<link rel="stylesheet" type="text/css" href="http://www.selfcareindia.com/js/plugins/jquery.jqplot.css" />

<script type="text/javascript" src="http://www.selfcareindia.com/js/plugins/jqplot.canvasTextRenderer.min.js"></script>
<script type="text/javascript" src="http://www.selfcareindia.com/js/plugins/jqplot.canvasAxisLabelRenderer.min.js"></script>
<script type="text/javascript" src="http://www.selfcareindia.com/js/plugins/jqplot.dateAxisRenderer.min.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
        // Some simple loops to build up data arrays.
        var cosPoints = [];
        for (var i=0; i<2*Math.PI; i+=0.4){ 
            cosPoints.push([i, Math.cos(i)]); 
        }
        
        console.log(cosPoints);

        var sinPoints = []; 
        for (var i=0; i<2*Math.PI; i+=0.4){ 
            sinPoints.push([i, 2*Math.sin(i-.8)]); 
        }



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

    });
</script>


<div id="chart3" style="height:300px; width:500px;"></div>