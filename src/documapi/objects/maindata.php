<?php
class MainData
{
    private $conn;

    public $idbank;
    public $accountnumber;
    public $ownername;
    public $bankdocument;
    public $bankname;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function readBankInfo()
    {
        $query = "SELECT * FROM banks WHERE status = 'active'";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->idbank = $row['id'];
            $this->accountnumber = $row['accountnumber'];
            $this->ownername = $row['ownername'];
            $this->bankdocument = $row['bankdocument'];
            $this->bankname = $row['bankname'];
            return true;
        } else {
            return false;
        }

    }
}
