<?php

    include_once("util.php");

    require_once('../includes/init_vars.php');
    $nameOfDatabase = DB_NAME;
    $connection = new MongoClient(CONN_STR);
    $db = $connection->$nameOfDatabase;

    session_start();


    $userObject = casttoclass('stdClass',unserialize($_SESSION["user"]));
    $userId =  $userObject->id;



    if(isset($_GET['id'])){

        $id = mysql_escape_string($_GET['id']);

        $mongoId = new MongoId($id);
        
        $criteria = array("userId"=>$userId,'_id'=>$mongoId);

        $collectionName = "result";
        $collection = $db->$collectionName; 
        $result = $collection->findOne($criteria);  
         
        $res_array = array();

        $res_array['id'] = $id;
        $res_array['groupId'] = $result['groupId'];
        $res_array['group_game_id'] = $result['group_game_id'];
        $res_array['picks'] = $result['picks'];
        $res_array['cc'] = sizeof($result['result']);  // current count
        $res_array['face'] = $result['face'];
        
        //field needed from game table 
        $face = new MongoInt64($result['face']); 
        $gameCollectionName = "game";
        $gameCollection = $db->$gameCollectionName;      
        $gameResult = $gameCollection->findOne(array('face'=>$face));  
        
         
         $res_array['expectation'] = $gameResult['expectation'];
         $res_array['interval'] = $gameResult['interval'];
         $res_array['image'] = $gameResult['submitImage'];
         
        
        echo json_encode($res_array);
        

    }else{

        $criteria = array("userId"=>$userId);

        $collectionName = "result";
        $collection = $db->$collectionName; 
        $result = $collection->find($criteria);  

     
        
           
         

        $res_array = array();


        while($result->hasNext())
        {

            $game = $result->getNext();
            $result_array = array();
            $result_array["id"] = (string)$game["_id"];
            $result_array["size_of_result"] = sizeof($game["result"]); 
            $result_array["correct"]  = 0;

            for($z=0;$z<$result_array["size_of_result"];$z++){ 
                if($game["result"][$z] == $game["goal"][$z]){

                    $result_array["correct"]++;         

                }
            }   

            $result_array["picks"] = $game["picks"];
            $result_array["face"] = $game["face"];





            if($result_array["size_of_result"] < $result_array["picks"])
            {
                array_push($res_array,$result_array);
            }


        } 

        if(sizeof($res_array) >= 1)
            echo  json_encode($res_array);
        else
            echo 1;

    }  

?>