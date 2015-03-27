
<script src="http://nakupanda.github.io/bootstrap3-dialog/assets/jquery/jquery-1.10.2.min.js"></script>
<link href="http://nakupanda.github.io/bootstrap3-dialog/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<script src="http://nakupanda.github.io/bootstrap3-dialog/assets/bootstrap/js/bootstrap.min.js"></script>
<script src="http://nakupanda.github.io/bootstrap3-dialog/assets/prettify/run_prettify.js"></script>
<link href="http://nakupanda.github.io/bootstrap3-dialog/assets/bootstrap-dialog/css/bootstrap-dialog.min.css" rel="stylesheet" type="text/css" />
<script src="http://nakupanda.github.io/bootstrap3-dialog/assets/bootstrap-dialog/js/bootstrap-dialog.min.js"></script>

<?
    error_reporting(-1);
    
     
    //echo getcwd();   
    
   // print_r(scandir (getcwd()));
     
    require_once('includes/init_vars.php'); 
    include_once("api/classes/C91_Parent.php");
    include_once("api/classes/C91_UserGroup.php");
       
    $obj = new C91_Parent();
    
        
    $nameOfDatabase = DB_NAME;
    $connection = new MongoClient(CONN_STR);
    $db = $connection->$nameOfDatabase;



   
    if(isset($_GET["groupMergeInvitation"]) && $_GET["groupMergeInvitation"]!=null && $_GET["groupMergeInvitation"]!="")
    {
        

        $groupMergeInvitation =  new MongoId($_GET["groupMergeInvitation"]);

        $groupMergeInfo = $obj->findOne("group_merge_invitation",array("_id"=>$groupMergeInvitation));                             
             


        $members = $obj->getAll("user_group",array("groupId"=>$groupMergeInfo['oldGroupId'],"visible"=>true),array("userId"=>1));


        while($members->hasNext()){

            $member = $members->getNext(); 
            $userGroup = new C91_UserGroup();   
            $userGroup->groupId = $groupMergeInfo['newGroupId'];
            $userGroup->userId = $member['userId'];  
            $userGroup->visible = true;

            if($userObject->id == $member['userId'] && $flag)   
            {
                $obj->saveDocument("user_group",$userGroup);
                $flag = false; 
            } 
            else  
                $obj->saveDocument("user_group",$userGroup);
        }   
        
        $obj->removeDocument("group_merge_invitation",array("_id"=>$groupMergeInvitation));

    }else{ 

        $userId = $_GET["id"];
        $collectionName = "newuser";
        $collection = $db->$collectionName; 
        $newdata = array('$set' => array("activation" =>1));
        $userId = new MongoId($userId);
        $return = $collection->update(array("_id"=>$userId),$newdata);
    }  
    //header("location:http://searsgame.91webagency.com/");
    if($return["nModified"]  ){


    ?> 

    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Notice</h4>
            </div>
            <div class="modal-body">
                <h3>Activation of Your Account is Succssful</h3>
            </div>
            <div class="modal-footer">
                <a href="http://searsgame.91webagency.com/" class="btn btn-primary">Go to S.EAR</a>
            </div>
        </div>
    </div>

    <?}else if($return["updatedExisting"]){?>

    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Notice</h4>
            </div>
            <div class="modal-body">
                <h3>Already Activated</h3>
            </div>
            <div class="modal-footer">
                <a href="http://searsgame.91webagency.com/" class="btn btn-primary">Go to S.EAR</a>
            </div>
        </div>
    </div>


    <?}else{?>

    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Notice</h4>
            </div>
            <div class="modal-body">
                <h3>Invalid Id</h3>
            </div>
            <div class="modal-footer">
                <a href="http://searsgame.91webagency.com/" class="btn btn-primary">Go to S.EAR</a>
            </div>
        </div>
    </div>


    <?}?>