<?php 
$fips = $_POST['fips'];
$db = new PDO('mysql:host=localhost;dbname=covid_map', 'root', 'root'); 
$sql = "SELECT deaths FROM counties WHERE fips = $fips AND date = '2020-03-09'"; 

$rs = $db->query($sql); 
if (!$rs) { 
    echo "An SQL error occured.\n"; 
    exit; 
} 

$rows = array(); 
while($r = $rs->fetch(PDO::FETCH_ASSOC)) { 
    //$rows[] = $r; 
    $deaths[] = ['deaths'];
} 

//print json_encode($rows); 
$db = NULL; 
return $deaths;
?> 