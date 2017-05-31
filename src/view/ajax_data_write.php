<?php

        date_default_timezone_set("Asia/Shanghai");

    $data=$_POST["sequ"];
        $logDir="temp";
        if(!is_dir($logDir))
        {
            mkdir($logDir, 0777, true);
        }
        $logDir = rtrim($logDir,'/');        
        $logFileName = date("YmdHis").rand(0,1000).".fasta";
        
        $count=count($data);
        $str="";
        for($i=0;$i<$count;$i++){
            $str.=">".$data[$i]["title"]."\n";
            $str.=$data[$i]["sequence"]."\n";           
        }
            file_put_contents($logDir.'/'.$logFileName, $str.PHP_EOL);
            
        $response = array('status' => "ok", 'result' => $logDir.'/'.$logFileName);    
        echo json_encode($response);
?>