
<?php

	error_reporting(1);
	
  if(isset($_POST)){	
	$nameOfDatabase = "sear_c91";
	$connection = new MongoClient(); 
	$db = $connection->$nameOfDatabase;
	
	
	
	$collectionName = "newuser";
	
	
    $collection = $db->$collectionName; 
	
	
	
	
	$userName = $_POST['userName'];
	$password = $_POST['password'];;
   
	$result = $collection->findOne(array("userName"=>$userName),array("password"));
	
	  
	
	
	if($result['password'] === $password)
		echo json_encode($result);
  }	


?>