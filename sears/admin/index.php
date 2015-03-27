
<?php  
    
    session_start();
    ob_start();  
   
    include_once("init_var.php");
    error_reporting(1);

    function __autoload($class_name) {
        
        include "model/".$class_name . '.php';
    }

    try{

        global $db;

        $connection = new MongoClient(CONN_STR); 
		
        $db = $connection->$nameOfDatabase;

        /* resultset for all the pages */
        global $cursor;  // declaration only
        
        global $page;   
       
        global $action;
        
        $action = "all" ; 
        
       if(isset($_SESSION['adminSessionId'])){  
        require_once('header.php');
        require_once('navigation.php');         
       }

        if(isset($_GET['page']) && !empty($_GET['page']))  /* if page varible set then only action has meaning otherewise not */
        {
            $page = $_GET['page']; 

            

            if(isset($_GET['action']) && !empty($_GET['action']))
                $action = $_GET['action'];

            if(isset($_POST['addORupdate']))
                $action = $_POST['addORupdate'];

            $cursor = null;         
                
        }

        if($page=="expectation"){

            include_once("controller/Expectation_Controller.php"); 

        }else
        if($page=="game"){
            include_once("controller/Game_Controller.php"); 

        }else
        if($page=="user"){
            include_once("controller/User_Controller.php"); 

        }else
        if($page=="group"){
            include_once("controller/Group_Controller.php"); 

        }else
        if($page=="result"){
            include_once("controller/Result_Controller.php"); 

        }else
        if($page=="logout"){
            include_once("logout.php"); 

        }else
        if($page=="dashboard"){
         }
         else
        if($page=="admin"){
            
            include_once("controller/Admin_Controller.php"); 
         }
        else
        {
           include_once("controller/Login_Controller.php"); 
        }                            
   
        require_once('footer.php');
        
        $connection->close(); 
        ob_flush(); 
        
    }catch(Exception $e){

        echo $e->getMessage();

    } 






?>
   
   
   
