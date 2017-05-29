<?php


require_once("mysql_exec.php");
require_once("oftentools.php");

$option=$_POST["option"];
$email=$_POST["email"];
$pwd=$_POST["pwd"];
// WriteLog($_POST,true);
// WriteLog($email);
// WriteLog($pwd);
$conn = new mysqlQuery();
$result=[];
if($option=="in"){
    $query = "select * from `user` where user_email='".$email."' and user_pwd=MD5('".$pwd."')";
    //WriteLog("log",$query);
    $statement = $conn->querysql($query);

    if($row = $statement->fetch(PDO::FETCH_ASSOC)){
        if($row["user_level"]=="1"){
            $result["level"]="user";
        }
        if($row["user_level"]=="9"){
            $result["level"]="admin";
        }
        $result["name"]=$row["user_email"];
        $response = array('status' => 'ok', 'result' => $result);
    }else{
        $response = array('status' => 'error', 'result' => "邮箱或密码不对");
    }
}
if($option=="up"){
    $query = "insert into user (user_email,user_pwd) values('".$email."',MD5('".$pwd."'))";
    //WriteLog("log",$query);
    $res = $conn->execsql($query);

    if($res["status"]=="success"){
        //默认等级为1
            $result["name"]=$email;
            $result["level"]="user";
        
        $response = array('status' => 'ok', 'result' => $result);
    }else{
        $response = array('status' => 'error', 'result' =>  $res["result"]);
    }
}
if($option=="out"){

}   
    
echo json_encode($response);
$conn->close();




?>