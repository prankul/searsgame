
<?php  

    session_start();
    ob_start();  

    include_once("init_var.php");
    error_reporting(-1);

    function __autoload($class_name) {
        include $class_name . '.php';
    }

    try{

        global $db;

        $connection = new MongoClient(); 
        $db = $connection->$nameOfDatabase;

        /* resultset for all the pages */
        global $cursor;  // declaration only

        global $page;   

         $url = $_SERVER['REQUEST_URI'];
         $url_array = explode("/",$url); 
           
          
          
           
          switch($url_array[3])
           {
              case "login": include_once("controller/C91FE_Login_Controller.php");break;
              case "register": include_once("controller/C91FE_Register_Controller.php");break;
              
           }  
         

        $connection->close(); 
        ob_flush(); 

    }catch(Exception $e){

        echo $e->getMessage();

    } 


?>
   
   
   
