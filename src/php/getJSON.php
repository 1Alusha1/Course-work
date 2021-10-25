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


$group = $_GET['group'];

if(isset($_GET['group'])){
    echo json_encode(otherQuery($link, "SELECT * FROM $_GET[group]"), JSON_UNESCAPED_UNICODE);
}
elseif(isset($_GET['group'])){
    echo  json_encode(otherQuery($link, "SELECT * FROM $_GET[group]"), JSON_UNESCAPED_UNICODE);
}

if(isset($_GET['0341'])){
    echo json_encode(otherQuery($link, "SELECT * FROM group034_1"), JSON_UNESCAPED_UNICODE);
}



