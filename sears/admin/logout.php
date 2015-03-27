<?php
   // $authObj = new C91_Auth();
    
    global $sessionId;
   
    	
    	
       // if($authObj->logout($sessionId)){
            unset($_SESSION['adminSessionId']);
           	header("Location: index.php?page=login");
           
        //    }
  
       
        //session_destroy();
?>