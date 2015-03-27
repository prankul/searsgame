<?php

		
		include_once("init_var.php");
		
		error_reporting(1); 
		$connection = new MongoClient(); 
        
		$db = $connection->$nameOfDatabase;
		
		if($connection)
		 echo "connection establish";



?>