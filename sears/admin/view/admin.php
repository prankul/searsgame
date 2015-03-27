<?php
    include_once("view/view.php"); // parent view 


    // List all function

    function userList(){ 

        listAll(array("Id","Name","Email-Id","User-Name","Password"),null);   /*  *(first parameter page-name),*(second is title for column),(third parameter is for column to show)*/

    }



    // edit and add new form function   

    function userForm($object=null,$allGroupList,$userCurrentGroup){

    ?>


    <!--  action is global -->
    <fieldset>
        <legend><?php if($object->getId()!=null) echo "EDIT"; else echo "ADD";?> User</legend>
        <form action="<?=base_path?>?page=admin&update=<?=$object->getId()?>" method=post >

            <!-- 

            use updateArray in url(action) by replacing update to update only specific fields

            eg: action="<?=base_path?>?page=user&updateArray=<?=$object->getId()?>"

            -->

            Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
            <input type="text" name="name" value="<?=$object->getName()?>" >
            <br><br>    

            Email-id:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="emailId" value="<?=$object->getEmailId()?>" >
            <br><br> 


            UserName:&nbsp;&nbsp;&nbsp;
            <input type="text" name="userName" value="<?=$object->getUserName()?>" >
            <br><br> 

            Password:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="password" name="password" value="<?=$object->getPassword()?>" >
            <br><br>                 



            <input type=submit name="addORupdate" value="<?php if($object->getId()==null){ echo "add"; }else{ echo "update"; }  ?>">

        </form>

    </fieldset>


    <?php   }  


