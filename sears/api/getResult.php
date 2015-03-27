<?php

    error_reporting(1);
    $number_in_words	= array("one","two","three","four","five","six","seven","eight","nine","eleven","twelve");

    $data = json_decode(file_get_contents('php://input'), true);

    $size = $data["number_of_picks"];

    $expectation  = $data["expectation"];

    $face = count($expectation);

    $result = array();

    $count_array = array();

    for($i=0;$i<$size;$i++){

        $min = (rand()%$face)+1;    

        $rand = rand ($min,rand($min,$face));
       
        $result[$i] = $rand; 
    }

    session_start();
    
    $_SESSION['game_session'] = $result;  


    $count_array = array_count_values($result);

    $response_array = array();


    for($i=1;$i<=$face;$i++){
        
        if($count_array[$i]==null)
          {
           $count_array[$i] = 0;     
          }  
        $response_array[$number_in_words[$i-1]] = $count_array[$i];	
    }

//shuffle($response_array);

    echo json_encode($response_array);

?>