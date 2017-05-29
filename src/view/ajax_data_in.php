<?php

require_once("mysql_exec.php");
require_once("oftentools.php");

//mb_internal_encoding('utf-8');

$conn = new mysqlQuery();

//密码
$email=$_GET["email"];
$pwd=MD5($_GET["pwd"]);
//pwd应该在前台已经进行了md5加密，传输过程中避免真实数据
//用户输入进行合法性验证
//TODO:正则实现



$query = "select * from `user` where user_email='".$email."' and user_pwd='".$pwd."'";
//WriteLog("log",$query);
$statement = $conn->querysql($query);

if($row = $statement->fetch(PDO::FETCH_ASSOC)){
    $response = array('status' => 'ok', 'result' => $row);
}else{
    $response = array('status' => 'error', 'result' => "邮箱或密码不对");
}
    
    

echo json_encode($response);
$conn->close();
?>