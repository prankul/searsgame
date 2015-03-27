<?php

     
        error_reporting(1);
      require_once('../includes/init_vars.php');
      include_once('auth/C91_Parent.php');
           
      include_once("util.php");
      $obj = new C91_Parent();
      $nameOfDatabase = DB_NAME;
      $connection = new MongoClient(CONN_STR);
      $db = $connection->$nameOfDatabase;

      $emailId = $_REQUEST['emailId'];
      
      $collectionName = "newuser";
      $collection = $db->$collectionName; 
        
       $user = $collection->findOne(array("emailId"=>$emailId));
      
       if(!empty($user))
       {
           
          $rand = mt_rand(100000,1000000000);
           
      $obj->update("newuser",array("emailId"=>$emailId),array("password"=>hash('sha256',$rand)));      
      echo mail($emailId,"connect91insaurabh@gmail.com","Your password is:".$rand);  
      
       }
      else 
         echo "empty";
       
        
      
        
        
        
?>