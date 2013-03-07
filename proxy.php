<?php
if (file_exists(__DIR__ .'/config.php')) {

	require_once __DIR__ .'/config.php';

	header('Content-type: application/json');
	$url = "https://api.mongohq.com/databases/mongo/collections/todo/documents?_apikey=" . MONGOHQ_API_KEY;

	$postData = file_get_contents("php://input");
	if (!empty($postData)) {
	    $ch = curl_init($url);
	    curl_setopt($ch, CURLOPT_POST ,1);
	    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
	    curl_setopt($ch, CURLOPT_POSTFIELDS , $postData);
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	    curl_setopt($ch, CURLOPT_FOLLOWLOCATION ,1);
	    curl_setopt($ch, CURLOPT_HEADER , 1);
	    echo curl_exec($ch);
	} else {
	    echo file_get_contents($url);
	}

}