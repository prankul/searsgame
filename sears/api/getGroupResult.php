<?php


    include_once("util.php");

    require_once('../includes/init_vars.php');
    $nameOfDatabase = DB_NAME;
    $connection = new MongoClient(CONN_STR);
    $db = $connection->$nameOfDatabase;

    /*$groupId = $_REQUEST["groupId"];

    $face = $_REQUEST['face'];   */

    $group_game_id = $_REQUEST["group_game_id"];
    
    /** cross check for date & create criteria accordingly */

    $groupGameCollectionName = "group_game";
    $groupGameCollection = $db->$groupGameCollectionName; 

     $group_game_mongo_id = new MongoId($group_game_id);
    
    
    $resultGroupGame = $groupGameCollection->findOne(array("_id"=>$group_game_mongo_id),array("endDate"=>true));

     session_start();
     $userObject = casttoclass('stdClass',unserialize($_SESSION["user"]));
     $userId =  $userObject->id;

       $timeStamp = time();  
     
     // print_r($resultGroupGame);
      
   /*   echo $timeStamp;
      echo "/n2.".$resultGroupGame['endDate'];  */
      
     
     if($resultGroupGame['endDate'] < $timeStamp)
       $criteria = array("group_game_id"=>$group_game_id,"userId"=>$userId);
     else
      $criteria = array("group_game_id"=>$group_game_id);

    /*if(isset($face))
    $criteria = array("groupId"=>$groupId,"face"=>$face,"group_game_id"=>$group_game_id);
    else
    $criteria = array("group_game_id"=>$group_game_id);
    */ 
    //session_start();
    /*
    $userObject = casttoclass('stdClass',unserialize($_SESSION["user"]));
    $userId =  $userObject->id;
    */

    $collectionName = "result";
    $collection = $db->$collectionName; 

    $result = $collection->find($criteria,array("result"=>true,"goal"=>true,"userId"=>true,"expectaion"=>true,"timeStamp"=>1))->sort(array('timeStamp' => -1));
    //$result->sort(array('date' => 1, 'age' => -1));
    $response_array = array();

    $i = 0;   


    class UserGroupGraph{

        var $resultString,$goalString,$name,$expectation,$time;

    }


    while($result->hasNext())
    {
        $groupGraph = $result->getNext();

        $userCollectionName = "newuser";
        $usercollection = $db->$userCollectionName; 
        $userIdMongo = new MongoId($groupGraph['userId']);
        $userResult = $usercollection->findOne(array("_id"=>$userIdMongo),array("name"=>true));

        $obj = new UserGroupGraph();

        $obj->goalString = $groupGraph["goal"];
        $obj->resultString = $groupGraph["result"];
        $obj->name = $userResult["name"];  
        $obj->expectation = unserialize($groupGraph["expectaion"]);
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