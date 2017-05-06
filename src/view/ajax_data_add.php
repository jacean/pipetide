<?php

require_once("oftentools.php");
require_once("mysql_exec.php");

//mb_internal_encoding('utf-8');

$conn = new mysqlQuery();


$query_header="insert into peptides (sequence,seqmd,title,activity,length,source,fromdb,dblink,target,validated,insertdate,modifydate,desctext)values( ";
$query_value="";

$title=isset($_POST["title"])?$_POST["title"]:"";
$sequence=isset($_POST["sequence"])?$_POST["sequence"]:"";
$activity=isset($_POST["activity"])?$_POST["activity"]:"";
$validated=isset($_POST["validated"])?$_POST["validated"]:"";
$source=isset($_POST["source"])?$_POST["source"]:"";
$target=isset($_POST["target"])?$_POST["target"]:"";
$desctext=isset($_POST["desctext"])?$_POST["desctext"]:"";

$query_value.= " '".$sequence."',";
$query_value.=" MD5('".$sequence."'),";
$query_value.= " '".$title."',";
$query_value.= " '".$activity."',";
$query_value.= " '".strlen($sequence)."',";//$length"',";
$query_value.= " '".$source."',";
$query_value.= " '"."test_user_name"."',";//$fromdb"',";//
$query_value.= " '"."test_user_link"."',";//$dblink"',";
$query_value.= " '".$target."',";
$query_value.= " '".$validated."',";
$query_value.= " '".GetDateStr()."',";//$insertdate"',";
$query_value.= " '".GetDateStr()."',";//$modifydate"',";
$query_value.= " '".$desctext."'";

$query= $query_header.$query_value.")";

WriteLog($query);

$response=[];

    $statement = $conn->execsql($query);
    if($statement["status"]=="success"){
        $response["status"]="ok";
        $response["result"]="操作影响了".$statement["result"]."条数据";
    }else{
        $response["status"]="error";
        $response["result"]=$statement["result"];
    }
    
echo json_encode($response);
$conn->close();
?>