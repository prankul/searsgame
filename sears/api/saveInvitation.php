<?php
		
		include_once("auth/C91_Parent.php");

		$obj = new C91_Parent();


		$data = json_decode(file_get_contents('php://input'), true);

		$emailId = $data['emailId'];
		$groupId = $data['groupId'];

		
		class Invitation{
 	
 			var $_id = null;
 			var $emailId = "";
 			var $groupId = "";
 			var $status = 0;


		}

		$object = new Invitation();
        $object->_id = new MongoId();
		$object->emailId = $emailId;
		$object->groupId = $groupId;

       
        
        $headers = 'From: noreply@sears.com' . "\r\n" .
    'Reply-To: connect91insaurabh@gmail.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
    
      $header.= "X-Priority: 1\r\n"; 

        mail($object->emailId,"Sears Group Request","please click to following link http://searsgame.91webagency.com/#invitation=$object->_id",$header);
		

		$obj->saveDocument("invitation",$object);
        


?>