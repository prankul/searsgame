
<?php

	//error_reporting(1);
	
	
	$nameOfDatabase = "sear_c91";
	$connection = new MongoClient(); 
	$db = $connection->$nameOfDatabase;
	
	
	
	$collectionName = "newuser";
	
	
    $collection = $db->$collectionName; 
	
	
	
	$name = $_POST['name'];
	$emailId = $_POST['email'];
	$userName = $_POST['email'];
	$password = $_POST['password'];;
	
	$array = array("name"=>$name,"emailId"=>$emailId,"userName"=>$userName,"password"=>$password);
   
	$result = $collection->save($array);
	
	  
	
	
	if($result['password'] === $password)
		echo json_encode($result);
	


?>