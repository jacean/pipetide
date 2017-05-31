<?php

    define("LOGDIR","log");
    function WriteLog($content,$isArr=false)
    {
        date_default_timezone_set("Asia/Shanghai");
        $logDir=LOGDIR;
        if(!is_dir($logDir))
        {
            mkdir($logDir, 0777, true);
        }
        $logDir = rtrim($logDir,'/');        
        $logFileName = date("Ymd").".log";
        if(!$isArr){
            file_put_contents($logDir.'/'.$logFileName, "[".date("Y-m-d H:i:s")."] ".$content.PHP_EOL, FILE_APPEND);
        }else{
            file_put_contents($logDir.'/'.$logFileName, "[".date("Y-m-d H:i:s")."] ".var_export($content,TRUE).PHP_EOL, FILE_APPEND);
        }
    }
    function GetDateStr(){
        return date("Y-m-d H:i:s");
    }
    function Arr2Str($arr){
        return var_export($arr,TRUE);
    }
?>