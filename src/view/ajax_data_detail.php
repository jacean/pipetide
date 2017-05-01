<?php

require_once("mysql_exec.php");
require_once("oftentools.php");

//mb_internal_encoding('utf-8');

$conn = new mysqlQuery();

$uid=$_GET["uid"];


$query = "select * from `peptides` where uid=".$uid."";
//WriteLog("log",$query);
$statement = $conn->querysql($query);

if($row = $statement->fetch(PDO::FETCH_ASSOC)){
    $response = array('status' => 'ok', 'result' => $row);
}else{
    $response = array('status' => 'error', 'result' => $row);
}
    
    

echo json_encode($response);
$conn->close();
?>