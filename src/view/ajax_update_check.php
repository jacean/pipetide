<?php
error_reporting(0); //屏蔽警告输出

require_once("mysql_exec.php");
require_once("oftentools.php");

//mb_internal_encoding('utf-8');

$conn = new mysqlQuery();
$response = array('status' => "ok", 'result' => "");


if (isset ($_POST["type"])) {
    $type=$_POST["type"];
    
    
    if ($type=="update") {
        $row=$_POST["row"];
        $uid=$row["uid"];
        $field=$_POST["field"];
        $update_query="UPDATE `temp_peptides` SET `".$field."`='".$row[$field]."' WHERE  `uid`=".$row["uid"]."";
        $result_query=$conn->execsql($update_query);
        if ($result_query["status"]=="success") {
                $response["status"]="ok";
                $response["result"]=$result_query["result"];
        } else {
            $response["status"]="error";
            $response["result"]=$result_query["result"];
        }
    }
    if ($type=="save") {
        $save_query="insert into peptides (sequence,seqmd,title,activity,length,source,fromdb,dblink,target,validated,insertdate,modifydate,desctext) select  sequence,seqmd,title,activity,length,source,fromdb,dblink,target,validated,insertdate,modifydate,desctext from temp_peptides ";
        if (isset($_POST["row"])) {
            $row=$_POST["row"];
            $count=count($row);
            $uids=join(",", $row);
            $save_query.=" where uid in (".$uids.")";
        } else {
        }
        // WriteLog($save_query);
        $result_query=$conn->execsql($save_query);
        if ($result_query["status"]=="success") {
            // //保存，从temp表删除，写入peptiode表
            // WriteLog($row["sequence"]);
            if (isset($_POST["row"])) {
                $row=$_POST["row"];
                $count=count($row);
                $uids=join(",", $row);
                $del_query="DELETE FROM temp_peptides WHERE  uid in (".$uids.")";
            } else {
                $del_query="DELETE FROM temp_peptides";
            }
            
            WriteLog($del_query);
            $result_query=$conn->execsql($del_query);
            if ($result_query["status"]=="success") {
                $response["status"]="ok";
                $response["result"]=$result_query["result"];
            } else {
                $response["status"]="error";
                $response["result"]=$result_query["result"];
            }
        } else {
            $response["status"]="error";
            $response["result"]=$result_query["result"];
        }


        // if ($result_query["status"]=="success") {
        //     $insert_query="insert into peptides (sequence,seqmd,title,activity,length,source,fromdb,dblink,target,validated,insertdate,modifydate,desctext)values( ";
        //     $insert_query.=" '".$row["sequence"]."',";
        //     $insert_query.=" MD5('".$row["sequence"]."'),";
        //     $insert_query.=" '".$row["title"]."',";
        //     $insert_query.=" '".$row["activity"]."',";
        //     $insert_query.=" '".$row["length"]."',";
        //     $insert_query.=" '".$row["source"]."',";
        //     $insert_query.=" '".$row["fromdb"]."',";
        //     $insert_query.=" '".$row["dblink"]."',";
        //     $insert_query.=" '".$row["target"]."',";
        //     $insert_query.=" '".$row["validated"]."',";
        //     $insert_query.=" '".$row["insertdate"]."',";
        //     $insert_query.=" '".GetDateStr()."',";
        //     $insert_query.=" '".$row["desctext"]."'";
        //     $insert_query.=")";
        //     $result_query=$conn->execsql($insert_query);
        //     if ($result_query["status"]=="success") {
        //         $response["status"]="ok";
        //         $response["result"]=$result_query["result"];
        //     } else {
        //         $response["status"]="error";
        //         $response["result"]=$result_query["result"];
        //     }
        // } else {
        //         $response["status"]="error";
        //         $response["result"]=$result_query["result"];
        // }
    }
    if ($type=="delete") {
        $del_query="DELETE FROM `temp_peptides`";
         if (isset($_POST["row"])) {
            $row=$_POST["row"];
            $count=count($row);
            $uids=join(",", $row);
            $del_query.=" where uid in (".$uids.")";
        } else {
        }
        WriteLog($del_query);
        $result_query=$conn->execsql($del_query);
        if ($result_query["status"]=="success") {
            $response["status"]="ok";
            $response["result"]=$result_query["result"];
        } else {
            $response["status"]="error";
            $response["result"]=$result_query["result"];
        }
    }
}
WriteLog(json_encode($response));
echo json_encode($response);
$conn->close();
