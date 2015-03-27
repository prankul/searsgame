<?php
    include_once("view/view.php"); // parent view 


    // List all function

    function userList(){ 

        listAll(array("Id","Name","Email-Id","Company","User-Name","Password"),null);   /*  *(first parameter page-name),*(second is title for column),(third parameter is for column to show)*/

    }



    // edit and add new form function   

    function userForm($object=null,$allGroupList,$userCurrentGroup){
        
    ?>


    <!--  action is global -->
    <fieldset>
            <legend><?php if($object->getId()!=null) echo "EDIT"; else echo "ADD";?> User</legend>
    <form action="<?=base_path?>?page=user&update=<?=$object->getId()?>" method=post >
    
      <!-- 
      
           use updateArray in url(action) by replacing update to update only specific fields
           
           eg: action="<?=base_path?>?page=user&updateArray=<?=$object->getId()?>"
      
      -->

        Name:    
        <input type="text" name="name" value="<?=$object->getName()?>" >
        <br><br>    

        Email-id:<input type="text" name="emailId" value="<?=$object->getEmailId()?>" >
        <br><br> 

        Company:
        <input type="text" name="company" value="<?=$object->getCompany()?>" >
        <br><br> 

       <!-- Groups:
        
        
        <select multiple name="group[]">
        
         <?php 
           
           if(!empty($userCurrentGroup))
             $userCurrentGroup_array = iterator_to_array($userCurrentGroup);
          
           while($allGroupList->hasNext())
            {
                 $temp_array = $allGroupList->getNext();
                 
                ?>
                <option value="<?=$temp_array['_id']?>"  <?php if(in_array($temp_array['_id'],$userCurrentGroup_array)) { echo "selected"; } ?>  ><?=$temp_array['name']?></option>
                    
          <?php  }       
         ?>
           
        
        </select>
        <br><br>        -->

        
        
        UserName:
        <input type="text" name="userName" value="<?=$object->getUserName()?>" >
        <br><br> 

        Password
        <input type="password" name="password" value="<?=$object->getPassword()?>" >
        <br><br>                 



        <input type=submit name="addORupdate" value="<?php if($object->getId()==null){ echo "add"; }else{ echo "update"; }  ?>">

    </form>

        </fieldset>
   
    
    <?php   }  


