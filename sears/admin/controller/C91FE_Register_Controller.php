<?php
    // See the password_hash() example to see where this came from.

    include_once("model/C91FE_Login.php");

    class C91FE_Register_Controller{



        public function getAuthenticate($userName,$password){

            $loginObject = new C91FE_Login();
            return $loginObject->authenticate($userName,$password);

        }


    }
    
    if(isset($_POST['submit']) && $_POST['submit']=="Register"){
        $registerController = new C91FE_Register_Controller();

        // sanitizing remaining

        $name = $_POST['name'];
        $email = $_POST['email'];
        $userName = $_POST['userName'];
        $password = $_POST['password'];
        $cPassword = $_POST['confirmPassword'];           
        
        
        if($password == $cPassword && $registerController->getRegister($name,$email,$userName,$password,$cPassword))
        {

            echo "Welcome";
        }else{

            echo "wrong";
        }
    }else
    {
        include_once("/login.php");
    }


?>
