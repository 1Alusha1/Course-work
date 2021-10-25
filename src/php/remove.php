<?php
$link = mysqli_connect(
    '127.0.0.1',
    'root',
    'root',
    'groups',
    '3306'
);
mysqli_query($link, "SET NAMES 'utf8'");

function otherQuery($link, $query)
{
    $result = mysqli_query($link, $query) or die(mysqli_errno($link));
    for ($data = []; $row = mysqli_fetch_assoc($result); $data[] = $row);
    return $data;
}

$groupName = $_GET['groupName'];
$id = $_GET['studentId'];
$cause = $_GET['cause'];
$date = $_GET['date'];


$groupN =$_GET['dGroup'];

if(isset($_GET['groupName'])){
    echo json_encode(otherQuery($link, "UPDATE $groupName SET deleted=0 ,ReasonForExpulsion = '$cause' ,ExpulsionDate = '$date' WHERE id = $id"), JSON_UNESCAPED_UNICODE);
}
elseif(isset($_GET['groupName'])){
    echo json_encode(otherQuery($link, "UPDATE $groupName SET deleted=0  ,ReasonForExpulsion = '$cause' ,ExpulsionDate = '$date' WHERE id = $id"), JSON_UNESCAPED_UNICODE);
}
elseif(isset($_GET['dGroup'])){
    echo json_encode(otherQuery($link, "SELECT * FROM $groupN WHERE deleted = 0"), JSON_UNESCAPED_UNICODE);
}


