<?php

require_once("mysql_exec.php");
require_once("oftentools.php");

//mb_internal_encoding('utf-8');

$conn = new mysqlQuery();

$offset = $_GET["offset"];
$limit = $_GET["limit"];

/*

$title=$_GET["title"];
$length=$_GET["length"];
$sequence=$_GET["sequence"];
$activity=$_GET["activity"];
$validated=$_GET["validated"];
$sourcedb=$_GET["sourcedb"];
$otherid=$_GET["otherid"];
*/

    $query = "select * from `peptides` limit ".$offset.", ".$limit."";
    $statement = $conn->querysql($query);

    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $results[] = $row;
    }

    $fenye = "SELECT count(`uid`) num FROM `peptides` WHERE 1";
    $statement = $conn->querysql($fenye);
    $rownum = $statement->fetch(PDO::FETCH_ASSOC);
    $total = $rownum["num"];
    $response = array('total' => $total, 'rows' => $results);

//WriteLog("log",json_encode($response));
echo json_encode($response);
$conn->close();
?>