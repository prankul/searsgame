
<?php

    error_reporting(1);
    include_once("util.php");

    require_once('../includes/init_vars.php');
    $nameOfDatabase = DB_NAME;
    $connection = new MongoClient(CONN_STR);
    $db = $connection->$nameOfDatabase;


    session_start();
    
    if($_SEREVR['REQUEST_METHOD']=="DELETE" && isset($_SESSION["user"])){
        
         
        
    }else{
    
    
    

    $game_result_string = $_SESSION["game_session"];

    unset($_SESSION["game_session"]);

    $collectionName = "result";


    $collection = $db->$collectionName; 

    $data = json_decode(file_get_contents('php://input'), true);


    $expectation_array = $data['expectation'];
    
    $id = $data['$id'];
    $picks = $data['number_of_picks'];
    $goal = $data['goal'];
    $result = $data["result"];
    $groupId = null;
    $face = $data["face"];
    if($data["group_id"]!=""){
     
         $groupId = $data["group_id"];
         $group_game_id = $data["group_game_id"];
    }  
    


    
    $userObject = casttoclass('stdClass',unserialize($_SESSION["user"]));

    $timeStamp = time();        
    $userId =  $userObject->id;
    

    if($id == null || $id==0) {
        //echo $id;
        $id = new MongoId();
        $array = array("_id"=>$id,"timeStamp"=>$timeStamp,"userId"=>$userId,"groupId"=>$groupId,"game"=>$gameId,"expectaion"=>serialize($expectation_array),"result"=>$result,"picks"=>$picks,"goal"=>$goal,"face"=>$face,"group_game_id"=>$group_game_id);

      $result = $collection->save($array);

    }  
    else        
    {
        $id = new MongoId($id);
        $arr = $collection->findOne(array("_id"=>$id),array("result","goal"));
        
        //merge previous result and goal
        
        $result = array_merge($arr["result"],$result);
        $goal = array_merge($arr["goal"],$goal);
        $collection->update(array("_id"=>$id),array('$set' => array("result"=>$result,"goal"=>$goal)));
    }  
        
        
   

    

    echo json_encode($id);  		
   
    }
?>