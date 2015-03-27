



<?php
    error_reporting(1);
    session_start();
    
   
    include_once("model/C91_Game_User.php");
    
    
    
    
    
    $game_user = new C91_Game_User();
    
    
     $timestamp =  time();

    $n = 10;
    $cnt = array();
    


    $loop = $n*$ppl;

    $i=0;

    while($n > $i){

        $cnt[$i]=mt_rand(0,1);
        $i++;  
    }

    //print_r($cnt[0]);
    print_r($cnt);
    echo serialize($cnt);
   // current date
  
   
   
   
   //echo date('d/m/Y',$timestamp); 

   
   
?>

