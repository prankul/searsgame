<?php
    include_once("model/C91_Parent.php");
    error_reporting(1);
    $obj = new  C91_Parent();
    $nameOfDatabase = "sear_c91"; 
    $connection = new MongoClient(); 
    $db = $connection->$nameOfDatabase;

    for($i=0;$i<3000;$i++){
        $arr["_id"]= new MongoId();
        $arr['timeStamp;'] = time();
        $arr['userId'] = "53fc29240bd384dc0e000029";
        $arr['groupId'] = null;
        $arr['game'] = "53faeff40bd3846808000029";
        $arr['result'] =serialize( array( [0] => 0,[1] => 0,[2] => 1,[3] => 0,[4] => 0,[5] => 1,[6] => 0,[7] => 1,[8] => 1,[9] => 1 ));
        $arr['requestUserId'] = null;
        $arr['expectation'] =  serialize(array("head","tail"));
        $arr['goal'] = 1;
        $arr['status'] = 1;

        $obj->saveDocument("result",$arr); 

    }   




?>