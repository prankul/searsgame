<?php

    
    include_once("util.php");

    require_once('../includes/init_vars.php');
    $nameOfDatabase = DB_NAME;
    $connection = new MongoClient(CONN_STR);
    $db = $connection->$nameOfDatabase;

       session_start();
       
      
    $userObject = casttoclass('stdClass',unserialize($_SESSION["user"]));
    $userId =  $userObject->id;
    
    
    $criteria = array("userId"=>$userId,'groupId'=>NULL);
    
     
                        

    $collectionName = "result";
    $collection = $db->$collectionName; 
    $result = $collection->find($criteria)->sort(array('timeStamp' => -1));
    $response_array = array();
    $i = 0;   


    class UserGroupGraph{

        var $resultString,$goalString,$expectation,$time;

    }
           

    while($result->hasNext())
    {
        $groupGraph = $result->getNext();

       
        $obj = new UserGroupGraph();
        
        $obj->expectation = unserialize($groupGraph["expectaion"]);
        $obj->goalString = $groupGraph["goal"];
        $obj->resultString = $groupGraph["result"];
        $obj->time = date(' d M Y H:i:s',$groupGraph["timeStamp"]);
        
        


        array_push($response_array,$obj);
        // print_r($response_array);   
        $i++;

    } 




    if(!empty($response_array)) 
        echo json_encode($response_array);    
    else
        echo true;  

?>