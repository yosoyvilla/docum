<?php
class User
{
    private $conn;
    private $table_name = "users";

    public $exists;
    public $id;
    public $email;
    public $rut;
    public $pwd;
    public $usertype;
    public $name;
    public $phone;
    public $token;
    public $created;
    public $modified;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function readOne($rut, $pwd)
    {
        $query = "SELECT *
            FROM
                " . $this->table_name . " WHERE rut = '" .$rut. "' AND password = '" . $pwd . "'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readOneByID($uid)
    {
        $query = "SELECT `id`, `email`, `password`, `usertype`, `name`, `phone`, `created`, `modified`
            FROM
                " . $this->table_name . " WHERE id = '" . $uid . "'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row['usertype'] == null) {
            $this->id = $row['id'];
            $this->usertype = $row['usertype'];
            $this->name = $row['name'];
            $this->phone = $row['phone'];
            $this->created = $row['created'];
            $this->modified = $row['modified'];
            $this->exists = true;
        } else {
            $this->exists = false;
        }
    }

    public function readAll()
    {
        $query = "SELECT * FROM " . $this->table_name . "";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readLogged($email, $tkn)
    {
        $query = "SELECT `id`, `email`, `password`, `usertype`, `name`, `phone`, `created`, `modified`
            FROM
                " . $this->table_name . " WHERE email = '" . $email . "' AND token = '" . $tkn . "'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row['usertype'] == null) {
            $this->id = $row['id'];
            $this->usertype = $row['usertype'];
            $this->name = $row['name'];
            $this->phone = $row['phone'];
            $this->created = $row['created'];
            $this->modified = $row['modified'];
            $this->exists = true;
        } else {
            $this->exists = false;
        }
    }

    public function create($email, $pwd, $name, $phone)
    {
        $query = "INSERT INTO " . $this->table_name . " SET email='".$email."', password='".$pwd."', usertype='Cliente', name='".$name."', phone='".$phone."', created='".date('Y-m-d H:i:s')."', modified='".date('Y-m-d H:i:s')."'";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function lostaccount($email)
    {
        $query = "SELECT `id`, `email`, `password`, `usertype`, `name`, `phone`, `created`, `modified`
            FROM
                " . $this->table_name . " WHERE email = '" . $email . "'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row['usertype'] == null) {
            $this->id = $row['id'];
            $this->usertype = $row['usertype'];
            $this->pwd = $row['password'];
            $this->name = $row['name'];
            $this->phone = $row['phone'];
            $this->created = $row['created'];
            $this->modified = $row['modified'];
            $this->exists = true;
        } else {
            $this->exists = false;
        }
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

    public function updateById($id, $email, $name, $phone)
    {
        $query = "UPDATE ".$this->table_name." SET name='".$name."', email='".$email."', phone='".$phone."', modified='".date('Y-m-d H:i:s')."' WHERE id='".$id."'";
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

    public function setToken()
    {
        $query = "UPDATE ".$this->table_name." SET token='".$this->token."' WHERE rut='".$this->rut."'";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return $query;
        }
        return $query;
    }

    public function getToken()
    {
        $query = "SELECT `token`
            FROM
                " . $this->table_name . " WHERE rut = '" . $this->rut . "'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->token = $row['token'];
    }
}
