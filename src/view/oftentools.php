<?php
    function WriteLog($logDir, $content)
    {
        date_default_timezone_set("Asia/Shanghai");
        if(!is_dir($logDir))
        {
            mkdir($logDir, 0777, true);
        }
        $logDir = rtrim($logDir,'/');
        $logFileName = date("Ymd-H-i-s-").rand().".log";
        //echo $logDir.'/'.$logFileName;
        file_put_contents($logDir.'/'.$logFileName, $content."\n");
    }
?>