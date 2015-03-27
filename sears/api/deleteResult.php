 <?php
         session_start();
      
        include_once("auth/C91_Parent.php");
        error_reporting(-1);
        $obj = new C91_Parent();

         
         if($_SERVER['REQUEST_METHOD']=="DELETE" && isset($_SESSION["user"])){
        
          
          $id = $_GET['id']; 

          $resultMongoId = new MongoId($id);
          
       echo $obj->removeDocument("result",array("_id"=>$resultMongoId));              
        
        
        
    }
    
  ?>  