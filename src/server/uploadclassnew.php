<?php
header("Content-Type:text/html; charset=utf-8");


require_once("oftentools.php");
// /**
// 不同功能只是调用的程序不同，其他一致
// CKSAAP_PhoglySite
// IMP_PUP
// iLM_2L
// */
$exec=$_POST["exec"];
$execPath=dirname(__FILE__)."\\";
$execFile=$exec.".exe";
$type=$_POST["type"];
$targetDir="../server/download/".$exec."/";
$response = array('status' => "ok","result"=>"received data and start run by follow order. \r\n","data"=>"","predict"=>"" );

// $response["result"]=is_dir($targetDir);
if ($type=="seqeForm") {
    $seqe=$_POST["seqe"];
        $inputfiles = new TextVerify();
        $inputfiles->perform_file();
} elseif ($type=="fileForm") {
    $file=$_FILES["uploadFile"];
    $upfiles = new Upload();
    $upfiles->upload_file();
}

echo json_encode($response);


class TextVerify
{
        /*作者：mckee 来自：www.phpddt.com*/

    public $upload_final_name;              //上传文件的最终文件名
    public $upload_target_dir;              //文件被上传到的目标目录
    public $upload_target_path;             //文件被上传到的最终路径
    public $text_content;
    //构造函数
    public function __construct()
    {
        $this->upload_target_name= date("YmdHis").rand(0, 100).".csv";
        $this->upload_target_dir=$GLOBALS["targetDir"];
    }
    public function perform_file()
    {
        //读取文本域序列并保存成Xinput.fasta文件
        $this->text_content =$GLOBALS["seqe"];
        // $myfile = fopen("Xinput.fasta", "w") or die("Unable to open file!");
        if (($myfile=fopen("Xinput.fasta", "w"))==false) {
            $GLOBALS["response"]["status"]="false";
            $GLOBALS["response"]["result"].=" 1. create seqe file fail,Error : Unable to open file! \r\n";
        } else {
            $GLOBALS["response"]["result"].=" 1. create seqe file sucess,next start ".$GLOBALS["exec"].".exe. \r\n";
        }
        fwrite($myfile, $this->text_content);
           
        system($GLOBALS["execFile"]);

        if (!is_dir($this->upload_target_dir)) {
            mkdir($this->upload_target_dir, 0777, true);
        }
        $mypath=$this->upload_target_dir."/".$this->upload_target_name;

        $fileName1=$GLOBALS["execPath"]."Pre_result.txt";

        if (file_exists($fileName1)) {
                copy($fileName1, $mypath); //拷贝到新目录
                unlink($fileName1); //删除旧目录下的文件
            
                $GLOBALS["response"]["result"].=" 2. run sucess,The prediction results have been saved to result file '$mypath' .\r\n";
                $GLOBALS["response"]["data"]=$mypath;
                $GLOBALS["response"]["predict"]=file_get_contents($mypath);//2017.5.31添加读取预测结果
				WriteLog($GLOBALS["response"]["predict"]);
                // echo("<form enctype='multipart/form-data' method='POST' >
                // 	<input type='button' name='button' value='Download' onclick=\"javascript:window.location.href='$mypath'\">
                // 	</form>");
        } else {
            // ob_end_clean();
            $GLOBALS["response"]["status"]="false";
            $GLOBALS["response"]["result"].=" 2. run fail,Error: The input was not a valid FASTA file OR contained some illegal characters, the prediction have been stopped.\r\n";
        }
    }
    
   /**
    *获取文件扩展名
    *@param String $filename 要获取文件名的文件
    */
    public function getFileExt($filename)
    {
        $info = pathinfo($filename);
        return $info["extension"];
    }
}
class Upload
{
        /*作者：mckee 来自：www.phpddt.com*/
    public $upload_name;                    //上传文件名
    public $upload_tmp_name;                //上传临时文件名
    public $upload_final_name;              //上传文件的最终文件名
    public $upload_target_dir;              //文件被上传到的目标目录
    public $upload_filetype ;               //上传文件类型
    public $allow_uploadedfile_type;        //允许的上传文件类型
    public $upload_file_size;               //上传文件的大小
    public $allow_uploaded_maxsize=10000000;    //允许上传文件的最大值
    //构造函数
    public function __construct()
    {
        $this->upload_name =$GLOBALS['file']["name"]; //取得上传文件名
        $this->upload_filetype = $GLOBALS['file']["type"];
        $this->upload_tmp_name = $GLOBALS['file']["tmp_name"];
        $this->allow_uploadedfile_type = array('fasta','txt');
        $this->upload_file_size = $GLOBALS['file']["size"];
        $this->upload_target_name= date("YmdHis").rand(0, 100).".csv";
        $this->upload_target_dir=$GLOBALS["targetDir"];
    }
    //文件上传
    public function upload_file()
    {
        if ($this->upload_file_size!=0) {
            $upload_filetype = $this->getFileExt($this->upload_name);
            if (in_array($upload_filetype, $this->allow_uploadedfile_type)) {
                if ($this->upload_file_size < $this->allow_uploaded_maxsize) {
                    if (!is_dir($this->upload_target_dir)) {
                        mkdir($this->upload_target_dir, 0777, true);
                    }
                    $mypath=$this->upload_target_dir."\\".$this->upload_target_name;

                    $this->upload_final_name = 'Xinput.fasta';
                    if (!move_uploaded_file($this->upload_tmp_name, "./Xinput.fasta")) {
                        $GLOBALS["response"]["status"]="false";
                        $GLOBALS["response"]["result"].=" 1. file upload failed. \r\n";
                    } else {
                        $GLOBALS["response"]["result"].= " 1. file upload successed,next start ".$GLOBALS["exec"]."exe. \r\n";
                    }
                    system($GLOBALS["execFile"]);
                
                    $fileName1=$GLOBALS["execPath"]."Pre_result.txt";

                    if (file_exists($fileName1)) {
                        copy($fileName1, $mypath); //拷贝到新目录
                        unlink($fileName1); //删除旧目录下的文件

                        $GLOBALS["response"]["result"].=" 2. run sucess,The prediction results have been saved to result file '$mypath' . \r\n";
                        $GLOBALS["response"]["data"]=$mypath;
                        // echo("<form enctype='multipart/form-data' method='POST' >
                        // 	<input type='button' name='button' value='Download' onclick=\"javascript:window.location.href='$mypath'\">
                        // 	</form>");
                    } else {
                        // ob_end_clean();
                        $GLOBALS["response"]["status"]="false";
                        $GLOBALS["response"]["result"].=" 2. run fail,Error: The input was not a valid FASTA file OR contained some illegal characters, the prediction have been stopped.\r\n";
                    }
                } else {
                    $GLOBALS["response"]["status"]="false";
                    $GLOBALS["response"]["result"].=" 1. file upload failed.Error : file was too big. \r\n";
                }
            } else {
                $GLOBALS["response"]["status"]="false";
                $GLOBALS["response"]["result"].=" 1. file upload failed.Error : file type is not supported. \r\n";
            }
        } else {
            $GLOBALS["response"]["status"]="false";
            $GLOBALS["response"]["result"].=" 1. file upload failed.Error : The input is empty, please upload again! \r\n";
        }
    }
   /**
    *获取文件扩展名
    *@param String $filename 要获取文件名的文件
    */
    public function getFileExt($filename)
    {
        $info = pathinfo($filename);
        return $info["extension"];
    }
}
