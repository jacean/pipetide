<?php 
require_once("config/mysql_config.php");
class mysqlQuery {
    var $dsn;
    var $user;
    var $password;
    var $dbh;

    function __construct() {
        $dsn = 'mysql:dbname='.DB_DATABASENAME.';host='.DB_HOST;
        $user = DB_USER;
        $password = DB_PASS;
        try {
            $this->dbh = new PDO($dsn, $user, $password);
            $this->dbh->exec("set names utf8;");
        } catch (PDOException $e) {
            echo "connect error:";  
            WriteLog("log","connect error:".$e);          
        }
    }
    /*
    针对没有结果集的查询，insert，delete，update，返回受影响的函数
    */
    function execsql($sql) {
        try {
            $this->dbh->beginTransaction();
            $affected = $this->dbh->exec($query);
            $this->dbh->commit();
            return $affected;
        } catch (PDOException $e) {
            $dbh->rollBack();
            echo $e->getMessage();
            return -1;
        }
    }
    /*
    针对select语句
    */
    function querysql($sql) {
        try {
            $this->dbh->beginTransaction();
            $pdostatement = $this->dbh->query($sql);
            $this->dbh->commit();
            return $pdostatement;
        } catch (PDOException $e) {
            $this->dbh->rollBack();
            echo $e->getMessage();
            return -1;
        }
    }

    public function close() {
        if ($this->dbh) {            
            $this->dbh = NULL;
        }
    }

    function __destruct() {
        $this->close();
    }

}