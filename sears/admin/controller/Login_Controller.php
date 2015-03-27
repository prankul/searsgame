<?php
    // See the password_hash() example to see where this came from.

    include_once("model/C91_Authenticate.php");

    class C91FE_Login_Controller{



        public function getAuthenticate($userName,$password){

            $loginObject = new C91_Authenticate();
            return $loginObject->authenticate($userName,$password);

        }


    }
    
     
    
    if(isset($_POST['submit'])){
        
        
        $loginController = new C91_Authenticate();
           
        // sanitizing remaining

        $userName = $_POST['userName'];
        $password = hash('sha256',$_POST['password']);   
        
        if($loginController->getAuthenticate($userName,$password))
        {
            session_start();
            $_SESSION['adminSessionId'] = session_id();
            
            header("location:index.php?page=dashboard"); 
        }else{

            
            header("location:index.php?page=login&auth=false");
        }
    }else
    {
       include_once("login.php");
    }


?>
