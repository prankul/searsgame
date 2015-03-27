<?php
    include_once("view/view.php"); // parent view 


    // List all function

    function resultList(){ 

        // listAll(array("Id","TimeStamp"));   /*  *(first parameter page-name),*(second is title for column),(third parameter is for column to show)*/

        /*
        *  projection of column can be set at controller level or view level;
        *  if we set projection @ controller it is good for performance than view
        */
    ?>
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.1.min.js">
    </script> 
    <script type="text/javascript" src="http://cdn.datatables.net/1.10.2/js/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" href="//cdn.datatables.net/1.10.2/css/jquery.dataTables.css" />


    <script>$(document).ready(function() {

        $('#example').dataTable( {
            "processing": true,
            "serverSide": true,
            "ajax": "view/server_processing.php"
        } );

       
        
     $("#group-select").change(function(){
         
         var id = $("#group-select option:selected").val();

               
               
         if(id!=0){
           
            $.ajax({
            type: "POST",
            url: "/ajax/getGroupResult.php",
            data: {"id":id},
            success: function(){},
            dataType: "json"
        });  
             
         }
                                              
         
         
     });     
        



    } );</script>


    <select id="group-select"><option value="-1">All</option><option value=1 >one</option><?php ?></select>
      <a href="http://searsgame.91webagency.com/ajax/getGroupResult.php">Get Csv</a>
    <table id="example" class="display" cellspacing="0" width="100%">
        <thead>

            <tr>
                <th>ID</th>
                <th>TimeStamp</th>
                <th>Name</th>
                <th>Group Name</th>
                <th>Delete</th>
            </tr>
        </thead>


    </table>

    <div class="constructionMask" style="height: 767px; display: none;"> </div>

    <div class="livePopupBlock" id="adminDelJQ" style="display: none; background-color: white;"> 
        <span class="closePopupJQ" style="padding-right: 10px; padding-top: 5px; float: right;">
            <strong>X</strong>
        </span>
        <h3>Are you sure you want to delete ?</h3>
        <span class="ok">OK</span>
        <span class="cancel closePopupJQ">Cancel</span>
    </div>      
    <?php


    }



    // edit and add new form function   

    function resultForm($object=null,$allGroupList,$userCurrentGroup){

    ?>


    <!--  action is global -->

    Operation Not available 




    <?php   }  

    function resultDetail($object,$otherInfo){



    }
