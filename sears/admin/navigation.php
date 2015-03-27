<?php 
   
?>

<nav id="topmenu">
    <ul>
        <li><a href="index.php?page=dashboard" title="Dashboard">Dashboard</a>
            <ul>
            	<li><a href="index.php?page=admin" title="Admin Module">Admin </a></li>
               <!-- <li><a href="#" title="Modify password">Modify password</a></li>
                <li><a href="admin/index.php?page=addUser" title="Modify password">Add Users</a></li>
                <li><a href="admin/index.php?page=adminLog" title="Modify password">Admin Logs</a></li>
                <li><a href="index.php?page=errorLogs" title="Modify password">Error Logs</a></li>-->
            </ul>
        </li>
        
        <li><a href="index.php?page=dashboard" title="Modules">Modules</a>
            <ul>
                
                <li><a href="<?=BASE_PATH?>?page=user" title="User module">User</a></li>
                <li><a href="<?=BASE_PATH?>?page=game" title="Game module">Game</a></li> 
               <!-- <li><a href="<?=BASE_PATH?>?page=expectation" title="Expectation module">Expectation</a></li>-->
                
                <li><a href="<?=BASE_PATH?>?page=group" title="Group module">Group</a></li>          
                <li><a href="<?=BASE_PATH?>?page=result" title="Result module">Result</a></li>    
                
                
            </ul>
        </li>
        
             
        <li><a href="index.php?page=logout" title="Logout">Logout</a></li>
       
    </ul>
           
</nav>
 <?php
      
      
?>

<div id="main" role="main">
        