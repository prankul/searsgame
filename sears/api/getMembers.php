<?php
		session_start();
		include_once("auth/C91_Parent.php");

		//error_reporting(1);

		$obj = new C91_Parent();


		$data = json_decode(file_get_contents('php://input'), true);


	 	 $groupId = $_REQUEST['groupId'];	

        
 		
 		$members = $obj->getAll("user_group",array("groupId"=>$groupId,"visible"=>true),array("userId"=>1));

        
          include_once("util.php");
         $userObject = casttoclass('stdClass',unserialize($_SESSION["user"]));
         $userId =  $userObject->id;
        
        // check for group admin
                $mongoGroupId = new MongoId($groupId);
                $grouparr = $obj->findOne("group",array("_id"=>$mongoGroupId),array("group_admin"=>1));
                
                $permission = false;
                
                if($grouparr['group_admin'] == $userId)
                  $permission = true;
                
                 
                
   class User{

            var $id,$name,$username,$permission;

          }

        $array_object = array();

        while($members->hasNext()){

		$member = $members->getNext();     

		
		$user = $obj->findOne("newuser",array("_id"=>new MongoId($member['userId'])),array("name"=>1));  	


		$object = new User();
		$object->name = $user["name"];
		$object->id =   (string)$user["_id"];;
        
        if(!$permission && $object->id == $userId)
         {
            $object->permission = true; 
            array_push($array_object,$object); 
             
         }else{
             
             $object->permission = $permission;
             array_push($array_object,$object);
         } 
        
				
			 
        }



		echo json_encode($array_object);

		


?>