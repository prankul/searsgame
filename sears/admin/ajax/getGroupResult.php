<?php


    include_once("util.php");

    require_once('../includes/init_vars.php');
    $nameOfDatabase = DB_NAME;
    $connection = new MongoClient(CONN_STR);
    $db = $connection->$nameOfDatabase;

    $collectionName = "result";
    $collection = $db->$collectionName; 
    $result = $collection->find($criteria,array("result"=>true,"goal"=>true,"userId"=>true));
    
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=data.csv');

    // create a file pointer connected to the output stream
    $output = fopen('php://output', 'w');

    // output the column headings
    fputcsv($output, array('Column 1', 'Column 2', 'Column 3'),'*','*');
    $rows = array(array("sagar","1","2"),array("vikas","2","3"),array("saurabh","1","2"));

    // loop over the rows, outputting them
    foreach($rows as $row) fputcsv($output, $row);



?>