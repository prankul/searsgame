<?php
      require_once('../includes/init_vars.php');
	  error_reporting(1);
      include_once("util.php");
	  $nameOfDatabase = DB_NAME;
      $connection = new MongoClient(CONN_STR);
      $db = $connection->$nameOfDatabase;

		
		$data = json_decode(file_get_contents('php://input'), true);	
		
      $group_id = $_REQUEST["group_id"];

         session_start();
         $userObject = casttoclass('stdClass',unserialize($_SESSION["user"]));
         $userId =  $userObject->id; 

        if(!empty($group_id))
         {
                             
                  $collectionName = "user_group_level";    
                 $collection = $db->$collectionName;
                 
                 $level_array = $collection->findOne(array("userId"=>$userId,"groupId"=>$group_id),array("level"=>true));
                 
         
         }else{

                 
                 
              $collectionName = "user_level";
             $collection = $db->$collectionName;
                $level_array = $collection->findOne(array("userId"=>$userId),array("level"=>true)); 

                
         }                 

        if(empty($level_array))
         echo 1; 
         else
        echo $level_array["level"];




?>