<?php
    
    $p = $_POST['problem_string'];
    $a = $_POST['answer_string'];
    $datetime = $_POST['datetime'];
    $user_ip = $_POST['user_ip'];
    $page_url = $_POST['page_url'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $topic = $_POST['topic'];
    $sub_topic = $_POST['sub_topic'];
    $operation = $_POST['operation'];
    
    $p = 'pdflatex "' . $p . '"'; echo $p;
    $original_location_p = "/usr/local/apache/htdocs/scripts/extarticle.pdf";
    $new_location_p = "/usr/local/apache/htdocs/latex-outputs/" . $datetime . "-problem-set.pdf";
    
    $action_make_p = shell_exec($p);
    $action_move_p = shell_exec("mv " . $original_location_p . " " . $new_location_p);
    echo $action_make_p . "\r\n\r\n" . $action_move_p;
    
    
    
    
    
    $a = 'pdflatex "' . $a . '"'; echo $a;
    $original_location_a = "/usr/local/apache/htdocs/scripts/extarticle.pdf";
    $new_location_a = "/usr/local/apache/htdocs/latex-outputs/" . $datetime . "-answer-set.pdf";
    
    $action_make_a = shell_exec($a);
    $action_move_a = shell_exec("mv " . $original_location_a . " " . $new_location_a);
    echo $action_make_a . "\r\n\r\n" . $action_move_a;
    
    
    
    
    
    

    define('DB_SERVER', 'localhost');
    define('DB_USERNAME', 'latexadmin');
    define('DB_PASSWORD', 'V!2fsz9popf');
    define('DB_DATABASE', 'latex');
    $conn = new mysqli(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
    
    if (!$conn) {
        die('Could not connect: ' . mysqli_error($conn));
    }
    
    $query_1 = "SELECT * FROM pdf_outputs;";
    $result_1 = mysqli_query($conn,$query_1);
    //echo json_encode(mysqli_fetch_all($result_1,MYSQLI_ASSOC));
    
    $query_2 = "INSERT INTO pdf_outputs " .
        " (problem_set_path,answer_set_path,created_date,created_time,created_by,created_by_ip_address,page_url,topic,sub_topic,operation) " .
        " values ('" . $new_location_p . "','" . $new_location_a . "','" . $date . "','" . $time .
        "','created_by','" . $user_ip . "','" . $page_url . "','" . $topic . "','" . $sub_topic . "','" . $operation . "');";
        
    if ($conn->query($query_2) === TRUE) {
        echo json_encode(mysqli_insert_id($conn));
        echo "Update successful!";
    } else {
        echo "Error: " . $query_2 . "<br>" . $conn->error;
    }
    
?>