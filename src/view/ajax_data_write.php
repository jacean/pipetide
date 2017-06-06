<?php

date_default_timezone_set("Asia/Shanghai");
require_once("mysql_exec.php");
require_once("oftentools.php");

if (isset($_POST["isAll"])) {
    $logDir="temp";
    if (!is_dir($logDir)) {
        mkdir($logDir, 0777, true);
    }
    $logDir = rtrim($logDir, '/');
    $logFileName = date("YmdHis").rand(0, 1000).".fasta";
    $str="";
    if ($_POST["isAll"]) {
        $conn = new mysqlQuery();
        $query="select uid,title,sequence from `peptides`";
        $statement = $conn->querysql($query);
        $i=0;
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $str.=">No.".$i.":".$row["title"]."(".$row["uid"].")"."\n";
            $str.=$row["sequence"]."\n";
            $i++;
        }
    } else {
        $data=$_POST["sequ"];
        $count=count($data);
        for ($i=0; $i<$count; $i++) {
            $str.=">No.".$i.":".$data[$i]["title"]."(".$data[$i]["uid"].")"."\n";
            $str.=$data[$i]["sequence"]."\n";
        }
    }
    file_put_contents($logDir.'/'.$logFileName, $str.PHP_EOL);
    $response = array('status' => "ok", 'result' => $logDir.'/'.$logFileName);
    echo json_encode($response);
}else {
    $response = array('status' => "error", 'result' => "非法访问");
    echo json_encode($response);
}
