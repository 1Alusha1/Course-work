<?php

$link = mysqli_connect(
    '127.0.0.1',
    'root',
    'root',
    'groups',
    '3306'
);
mysqli_query($link, "SET NAMES 'utf8'");

// echo $_POST["StudentName"];
function otherQuery($link, $query)
{
    $result = mysqli_query($link, $query) or die(mysqli_errno($link));
    for ($data = []; $row = mysqli_fetch_assoc($result); $data[] = $row);
    return $data;
}
if (isset($_POST['group']) and isset($_POST['StudentName']) and isset($_POST['surName']) and isset($_POST['lastName']) and isset($_POST['dateOfBirth']) and isset($_POST['homeAddress']) and isset($_POST['yearОfAdmission']) and isset($_POST['typeOfTraining']) and isset($_POST['studentGroup']) and isset($_POST['studentNumber'])) {
    $group = $_POST['group'];
    $StudentName = $_POST['StudentName'];
    $surName = $_POST['surName'];
    $lastName = $_POST['lastName'];
    $dateOfBirth = $_POST['dateOfBirth'];
    $homeAddress = $_POST['homeAddress'];
    $yearОfAdmission = $_POST['yearОfAdmission'];
    $typeOfTraining = $_POST['typeOfTraining'];
    $studentGroup = $_POST['studentGroup'];
    $studentNumber = $_POST['studentNumber'];
    echo otherQuery($link, "INSERT INTO $group SET StudentName = '$StudentName',
    surName= '$surName',
     lastName='$lastName',
     dateOfBirth='$dateOfBirth',
     homeAddress='$homeAddress',
     yearОfAdmission=$yearОfAdmission,
     typeOfTraining='$typeOfTraining',
     studentGroup='$studentGroup',
     studentNumber=$studentNumber,
     ExpulsionDate = 'NULL',
     ReasonForExpulsion='NULL',
     deleted = 1");
}
