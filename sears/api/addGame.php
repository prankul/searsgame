<?php
    
      error_reporting(1);
    include_once("util.php");

    require_once('../includes/init_vars.php');
    $nameOfDatabase = DB_NAME;
    $connection = new MongoClient(CONN_STR);
    $db = $connection->$nameOfDatabase;
    $collectionName = "game";
    $collection = $db->$collectionName; 
    
    $card = array();
    $arr = array('A','B','C','D');
    
    for($j=0;$j<4;$j++){
    
        for($i=1;$i<=13;$i++)
    {
        
          $str = $arr[$j].$i;
          echo $str;
          array_push($card,$str);
        
    }    
        
    }
    
    $save_array = array('name'=>'cards','face'=>52,'expectation'=>$card,'interval'=>3); 
    // $collection->save($save_array);
?>