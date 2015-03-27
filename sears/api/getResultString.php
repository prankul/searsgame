<?php

    error_reporting(-1);

    require_once('../includes/init_vars.php');
    include_once("util.php");    


    session_start();
    $userObject = casttoclass('stdClass',unserialize($_SESSION["user"]));
    $current_id =  $userObject->id;

    $nameOfDatabase = DB_NAME;
    $connection = new MongoClient(CONN_STR);

    $db = $connection->$nameOfDatabase;          
    $collectionName = "result";

    $collection = $db->$collectionName; 

    // echo "here";exit;  

    $result = $collection->find(array('userId'=>$current_id,"groupId"=>null ));



    // $result = $collection->count(array('userId'=>'5424106f730e733c3b3c9868'));
    // echo $result;    
    //  var_dump($collection->lastError());   

    $result->sort(array('timeStamp' => -1 ));
    $result->limit(1);

    $result_array = $result->getNext();

    $string = unserialize($result_array["result"]);  
    $goal = $result_array['goal'];
     
    
    $expectation = unserialize($result_array['expectaion']);
    
    //percentage calculation
    
     
     $number_in_words    = array("one","two","three","four","five","six","seven","eight","nine","eleven");
     
     
     $size = count($string);
     $count_array = array_count_values($string);
     
     
     
     $perc = array();
      
      
      
     
       
       for($i=1;$i<=$size;$i++)
        {
              
            if(!empty($count_array[$i]))
             {
                 $perc[$i] = ($count_array[$i]*100)/$size;
             }
            
            
        }
     
     $message = "Better Luck Next Time";
         if($perc[$goal] >= 50)  
       {
           $message = "You Win";
       } 
     
      
    
    
    echo json_encode(array("perc"=>$perc,"string"=>$string,"message"=>$message));
    
    

?>