<?php
class Cancha
{
    private $conn;
    private $table_name = "canchas";

    public $id;
    public $idc;
    public $name;
    public $description;
    public $capacity;
    public $created;
    public $modified;
    public $idCancha;
    public $horario;
    public $estado;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function readAll()
    {
        $query = "SELECT * FROM canchas INNER JOIN costs on canchas.id = costs.idField";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function update($id, $name, $description, $capacity, $value)
    {
        $query = "UPDATE canchas SET name='".$name."', description='".$description."', capacity='".$capacity."', modified='".date('Y-m-d H:i:s')."' WHERE id='".$id."'";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
          $queryT = "UPDATE costs SET value='".$value."' WHERE idField='".$id."'";
          $stmtT = $this->conn->prepare($queryT);
          if ($stmtT->execute()) {
            return true;
          }else{
            return false;
          }
        }
        return false;
    }

    public function create($name, $description, $capacity, $value)
    {
        $query = "INSERT INTO canchas SET name='".$name."', description='".$description."', capacity='".$capacity."', created='".date('Y-m-d H:i:s')."', modified='".date('Y-m-d H:i:s')."'";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
          $queryT = "INSERT INTO costs SET idField=(SELECT MAX(id) FROM canchas), value='".$value."'";
          $stmtT = $this->conn->prepare($queryT);
          if ($stmtT->execute()) {
            return true;
          }else{
            return false;
          }
        }
        return false;
    }

    public function getTimes($idCancha)
    {
        $query = "SELECT * FROM disponibilidad WHERE idCancha=" . $idCancha . "";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getLogByIDandDate($idCancha, $rentedTime)
    {
        $query = "SELECT id FROM logrents WHERE idCancha=" . $idCancha . " AND rentedDate='".$rentedTime."'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function insertIntoLog($idCanchaU, $idUser, $rentedTime, $horarioU)
    {
        $query = "INSERT INTO logrents SET idCancha=" . $idCanchaU . ", idUser=" . $idUser . ", rentedTime=" . $rentedTime . "";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function rentField($idCanchaU, $idUser, $rentedTime, $horarioU)
    {
        $query = "INSERT INTO alquiler SET idCancha=" . $idCanchaU . ", idUser=" . $idUser . ", rentedTime=" . $rentedTime . "";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function myRents($idUser)
    {
        $query = "SELECT alquiler.rentedTime, alquiler.idCancha FROM alquiler WHERE alquiler.idUser=" . $idUser . "";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function deleteFieldById($idField)
    {
        $query = "DELETE FROM alquiler WHERE id = ".$idField."";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function deleteIDField($idField)
    {
        $query = "DELETE FROM canchas WHERE id = ".$idField."";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            $queryT = "DELETE FROM costs WHERE idField = ".$idField."";
            $stmtT = $this->conn->prepare($queryT);
            if ($stmtT->execute()) {
              return true;
            }else{
              return false;
            }
        }
        return false;
    }

    public function allRents()
    {
        $query = "SELECT * FROM alquiler";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function fields($idCancha)
    {
        $query = "SELECT canchas.name FROM canchas WHERE canchas.id = " . $idCancha . "";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getIfRented($horario, $dtrent)
    {
        $query = "SELECT COUNT(*) as qtn from alquiler WHERE rentedTime LIKE '%" . $dtrent . " de " . $horario . "%'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getIfFieldRented($idCanchaU, $dtrent)
    {
        $query = "SELECT COUNT(*) as qtn from alquiler WHERE rentedTime = " . $dtrent . " AND idCancha = " . $idCanchaU . "";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getIfFieldRentedByTime($idCanchaU, $dayToRent, $dtrent)
    {
        $query = "SELECT COUNT(*) as qtn from alquiler WHERE rentedTime like '%".$dayToRent." de " . $dtrent . "%' AND idCancha = " . $idCanchaU . "";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getAllDataOfRented($idCanchaU, $dayToRent, $dtrent)
    {
        $query = "SELECT * from alquiler WHERE rentedTime like '%".$dayToRent." de " . $dtrent . "%' AND idCancha = " . $idCanchaU . "";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
