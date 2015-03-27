<?php

// Database Connection
    error_reporting(1);

    include_once("../init_var.php");

    $page = "result";
    $connection = new MongoClient(CONN_STR); 
    $db = $connection->$nameOfDatabase;
    $collectionName = "result";
    $collection  = $db->$collectionName;  



	
// Fetch Record from Database

$output			= "";
$table 			= ""; // Enter Your Table Name
$sql 			= mysql_query("select * from $table");
$columns_total 	= mysql_num_fields($sql);

// Get The Field Name

for ($i = 0; $i < $columns_total; $i++) {
	$heading	=	mysql_field_name($sql, $i);
	$output		.= '"'.$heading.'",';
}
$output .="\n";

// Get Records from the table

while ($row = mysql_fetch_array($sql)) {
for ($i = 0; $i < $columns_total; $i++) {
$output .='"'.$row["$i"].'",';
}
$output .="\n";
}

// Download the file

$filename =  "myFile.csv";
header('Content-type: application/csv');
header('Content-Disposition: attachment; filename='.$filename);

echo $output;
exit;
	
?>
