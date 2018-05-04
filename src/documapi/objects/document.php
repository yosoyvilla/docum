<?php
class Documfiles
{
    private $conn;
    private $table_name = "documfiles";

    public $exists;
    public $id;
    public $rut;
    public $filename;
    public $filetype;
    public $doctorname;
    public $filevalue;
    public $created;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function readOne($rut)
    {
        $query = "SELECT *
            FROM
                " . $this->table_name . " WHERE rut = '" .$rut. "'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readOneByID($uid)
    {
        $query = "SELECT *
            FROM
                " . $this->table_name . " WHERE id = '" . $uid . "'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readAll()
    {
        $query = "SELECT * FROM " . $this->table_name . "";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create($rut, $email, $pwd, $name, $phone)
    {
        $query = "INSERT INTO " . $this->table_name . " SET email='".$email."', rut='".$rut."', password='".$pwd."', usertype='Cliente', name='".$name."', phone='".$phone."', created='".date('Y-m-d H:i:s')."', modified='".date('Y-m-d H:i:s')."'";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function update($email, $pwd, $name, $phone)
    {
        if($pwd === "" || strpos($pwd, '*') !== false){
            $query = "UPDATE ".$this->table_name." SET name='".$name."', phone='".$phone."', modified='".date('Y-m-d H:i:s')."' WHERE email='".$email."'";
        }else{
            $query = "UPDATE ".$this->table_name." SET password='".$pwd."', name='".$name."', phone='".$phone."', modified='".date('Y-m-d H:i:s')."' WHERE email='".$email."'";
        }
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function updateById($id, $rut, $email, $name, $phone)
    {
        $query = "UPDATE ".$this->table_name." SET name='".$name."', SET='".$rut."', email='".$email."', phone='".$phone."', modified='".date('Y-m-d H:i:s')."' WHERE id='".$id."'";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete($email)
    {
        $query = "DELETE FROM ".$this->table_name." WHERE email='".$email."'";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function deletebyid($id)
    {
        $query = "DELETE FROM ".$this->table_name." WHERE id='".$id."'";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
