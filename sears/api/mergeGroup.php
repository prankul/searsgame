<?



    $id_Array = $_POST['id'];


    if(isset($_POST['id'])){

        $data['name'] = "New Group";

        include_once('saveGroup.php');
        include_once("auth/C91_Parent.php");
        include_once("classes/C91_UserGroup.php"); 
        include_once("classes/C91_GroupMergeInvitation.php"); 
        $obj = new C91_Parent();

        $flag = true; // flag which prevents repeatation admin record insertion in list     

        foreach($id_Array as $id)  
        {

            /*$members = $obj->getAll("user_group",array("groupId"=>$id,"visible"=>true),array("userId"=>1));


            while($members->hasNext()){

            $member = $members->getNext(); 
            $userGroup = new C91_UserGroup();   
            $userGroup->groupId = $object->_id;
            $userGroup->userId = $member['userId'];  
            $userGroup->visible = true;

            if($userObject->id == $member['userId'] && $flag)   
            {
            $obj->saveDocument("user_group",$userGroup);
            $flag = false; 
            } 
            else  
            $obj->saveDocument("user_group",$userGroup);
            }     */

            //To get group admin
            $groupMongoId = new MongoId($id);
            $group = $obj->findOne("group",array("_id"=>$groupMongoId),array('group_admin'=>true));

            if(!empty($group)){


                // to get admin's email id
                $userMongoId = new MongoId($group['group_admin']);
                $admin = $obj->findOne("newuser",array("_id"=>$userMongoId),array('name'=>true,"emailId"=>true));


                $groupMergeInvitation = new C91_GroupMergeInvitation();

                $groupMergeInvitation->_id = new MongoId();
                $groupMergeInvitation->newGroupId  = $object->_id;
                $groupMergeInvitation->oldGroupId  = $id;
                $obj->saveDocument("group_merge_invitation",$groupMergeInvitation);

                
                $headers = 'From: noreply@sears.com' . "\r\n" .
                'Reply-To: connect91insaurabh@gmail.com' . "\r\n" .
                'X-Mailer: PHP/' . phpversion();

                $header.= "X-Priority: 1\r\n"; 

                mail($admin['emailId'],"Sear's Group Merge Request","please click to following link http://searsgame.91webagency.com/activation.php?groupMergeInvitation=$groupMergeInvitation->_id",$header);


            }   

        }                



    }  

?>