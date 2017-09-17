<?php
    
    $ip = $_POST['user_ip'];
    $seconds = $_POST['seconds'];
    $duration = $_POST['duration'];
    $city = $_POST['city'];
    $country_code = $_POST['country_code'];
    $country_name = $_POST['country_name'];
    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];
    $metro_code = $_POST['metro_code'];
    $region_code = $_POST['region_code'];
    $region_name = $_POST['region_name'];
    $time_zone = $_POST['time_zone'];
    $zip_code = $_POST['zip_code'];
    $visit_date = $_POST['visit_date'];
    $visit_time = $_POST['visit_time'];
    $page_url = $_POST['page_url'];
    $is_mobile = $_POST['is_mobile'];
    $is_tablet = $_POST['is_tablet'];
    
    define('DB_SERVER', 'localhost');
    define('DB_USERNAME', 'latexadmin');
    define('DB_PASSWORD', 'V!2fsz9popf');
    define('DB_DATABASE', 'latex');
    $conn = new mysqli(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
    
    if (!$conn) {
        die('Could not connect: ' . mysqli_error($conn));
    }
    

    
    
    $query = "INSERT INTO visit " .
        " (date_seconds,ip_address,duration,country_code,country_name,region_code,region_name,city,zip_code,time_zone,".
            "latitude,longitude,metro_code,visit_date,visit_time,page_url,user_name,is_mobile,is_tablet) " .
        " values ('" . $seconds . "','" . $ip . "','" . $duration . "','".$country_code."','".$country_name."','".$region_code.
            "','".$region_name."','".$city."','".$zip_code."','".$time_zone."','".$latitude."','".$longitude."','".$metro_code.
            "','".$visit_date."','".$visit_time."','".$page_url."','','".$is_mobile."','".$is_tablet."')" .
        "ON DUPLICATE KEY UPDATE duration = VALUES(duration)" . ";";
        
    if ($conn->query($query) === TRUE) {
        echo json_encode(mysqli_insert_id($conn));
        echo "Update successful!";
    } else {
        echo "Error: " . $query . "<br>" . $conn->error;
    }
    
?>