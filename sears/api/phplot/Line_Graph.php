<?php
//Include the code
require_once 'phplot.php';

//Define the object
$plot = new PHPlot();

//Define some data
$example_data = array(
     array('1',1),
     array('2',2),
     array('3',1),
     array('3',1),
     array('4',2),
     array('5',1),
     array('6',2)
);
$plot->SetDataValues($example_data);



//Turn off X axis ticks and labels because they get in the way:
$plot->SetXTickLabelPos('none');
$plot->SetXTickPos('none');
$plot->TuneYAutoRange(1,'R',0);

//Draw it
$plot->DrawGraph();




?>