<?php

require_once("mysql_exec.php");
require_once("oftentools.php");

//mb_internal_encoding('utf-8');

$conn = new mysqlQuery();

$offset = $_GET["offset"];
$limit = $_GET["limit"];

function setQueryCondition(){
    $uid=isset($_GET["uid"])?$_GET["uid"]:"";
    $title=isset($_GET["title"])?$_GET["title"]:"";
    $length=isset($_GET["length"])?$_GET["length"]:"";
    $sequence=isset($_GET["sequence"])?$_GET["sequence"]:"";
    $activity=isset($_GET["activity"])?$_GET["activity"]:"";
    $validated=isset($_GET["validated"])?$_GET["validated"]:"";
    $fromdb=isset($_GET["fromdb"])?$_GET["fromdb"]:"";
    $source=isset($_GET["source"])?$_GET["source"]:"";
    
    WriteLog($uid);
    $condition="";
    //可以模糊查找，修改=为%
    $condition.=$title==""?"":" title like '%".$title."%' ";

    if($uid!=""){
        $condition.=$condition==""?"":"  and ";
        // $condition.=$length==""?"":" and length='".$length."' ";
        $condition.=$uid==""?"":" uid =".$uid." ";    
    }
    if($sequence!=""){
        $condition.=$condition==""?"":"  and ";
        // $condition.=$length==""?"":" and length='".$length."' ";
        $condition.=$sequence==""?"":" sequence like '%".$sequence."%'";    
    }

    if($activity!=""){
        //TODO:可在此处扩展，选择是and还是or
        $actArr=explode(',',$activity);
        $actCount=count($actArr);
        WriteLog($actArr,true);
        for($i=0;$i<$actCount;$i++){
            $condition.=$condition==""?"":"  and ";
            $condition.=$actArr[$i]==""?"":" activity like '%".$actArr[$i]."%'";   
        }
    }
 
    if($validated!=""&&$validated!="all"){
        $condition.=$condition==""?"":"  and ";
        if($validated=="unknown"){
            $condition.=$validated==""?"":"  validated='' ";               
        }else{
            $condition.=$validated==""?"":"  validated like '%".$validated."%'";   
        } 
    }
 
    if($fromdb!=""){
        $condition.=$condition==""?"":"  and ";
        $condition.=$fromdb==""?"":" fromdb='".$fromdb."'"; 
    }
    if($source!=""){    
        $condition.=$condition==""?"":"  and ";
        $condition.=$source==""?"":"  source like '%".$source."%' ";
    }

    $lenrange=explode('-',$length);

    $cou=count($lenrange);
    if($cou>1){        
        if($lenrange[0]!=""){
            $condition.=$condition==""?"":"  and ";
            $condition.= " length>".$lenrange[0];
        }
        if($lenrange[1]!=""){
            $condition.=$condition==""?"":"  and ";
            $condition.= " length<".$lenrange[1];
        }

    }else if ($cou>0&&$lenrange[0]!=""){
        
        $condition.=$condition==""?"":"  and ";
        $condition.=" length>".$lenrange[0];
    }    

    //$condition.= " limit ".$offset.", ".$limit."";
    if($condition==""){
        $condition=" 1 ";
    }
    $condition=" where ".$condition;
    WriteLog($condition);
    return $condition;    
        
}
    $condition=setQueryCondition();
    $query = "select * from `peptides` ";
    $query.=$condition;
    $query.= " limit ".$offset.", ".$limit."";
    
    //$query = "select * from `peptides` limit ".$offset.", ".$limit."";
    $statement = $conn->querysql($query);

    $results=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $results[] = $row;
    }

    $fenye = "SELECT count(`uid`) num FROM `peptides` ".$condition;
    $statement = $conn->querysql($fenye);
    $rownum = $statement->fetch(PDO::FETCH_ASSOC);
    $total = $rownum["num"];
    $response = array('total' => $total, 'rows' => $results);

//WriteLog(json_encode($response));
echo json_encode($response);
$conn->close();
?>