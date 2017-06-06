<?php

require_once("mysql_exec.php");
require_once("oftentools.php");

//mb_internal_encoding('utf-8');

$conn = new mysqlQuery();


   
    $query = "select * from `temp_peptides` ";

if (isset($_GET["offset"])) {
    $offset = $_GET["offset"];
    $limit = $_GET["limit"];
    $query.= " limit ".$offset.", ".$limit."";

    //$query = "select * from `peptides` limit ".$offset.", ".$limit."";
    $statement = $conn->querysql($query);

    $results=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $results[] = $row;
    }
    $fenye = "SELECT count(`uid`) num FROM `temp_peptides` ";
    $statement = $conn->querysql($fenye);
    $rownum = $statement->fetch(PDO::FETCH_ASSOC);
    $total = $rownum["num"];
    $response = array('total' => $total, 'rows' => $results);
} else {
        $statement = $conn->querysql($query);

    $results=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $results[] = $row;
    }
    $response = $results;
}





// WriteLog(json_encode($response));
echo json_encode($response);
$conn->close();
