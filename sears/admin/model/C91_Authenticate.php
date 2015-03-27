
<?php




    class C91_Authenticate extends C91_Parent{

        public function getAuthenticate($username,$passswordString){
            
            
            $passwordHash = $this->findOne("admin",array("userName"=>$username),array("password"));
             
            if(!empty($passswordString) && $passswordString==$passwordHash['password'])
              return true;
            else
              return false;  

        }




    }


?>