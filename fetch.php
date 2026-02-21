<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli("localhost:3307", "root", "", "kar_portal");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['name'];
$aadhaar = $_POST['aadhaar'];
$reason = $_POST['reason'];

$result = $conn->query("SELECT COUNT(*) as total FROM users");
$row = $result->fetch_assoc();
$count = $row['total'];

$start_time = strtotime("09:00 AM");
$slot_time = $start_time + ($count * 10 * 60);
$assigned_time = date("h:i A", $slot_time);

$insertSql = "INSERT INTO users (name, aadhaar, reason, created_at)
              VALUES ('$name', '$aadhaar', '$reason', '$assigned_time')";

$success = false;

if ($conn->query($insertSql) === TRUE) {
    $success = true;
}

$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="landreg.css">

    <title>Registration Status</title>
    <link rel="stylesheet" href="landreg.css">
    <style>
        .success { color: #28a745; }
        .error { color: red; }
        .info-box {
            background: #f4f4f4;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
        }
    </style>
</head>
<body>

<div class="background">
    <div class="login-card">

        <?php if($success) { ?>
            <h2 class="success">Registration Successful ✅</h2>

            <div class="info-box">
                <p><strong>Name:</strong> <?php echo htmlspecialchars($name); ?></p>
                <p><strong>Aadhaar:</strong> <?php echo htmlspecialchars($aadhaar); ?></p>
                <p><strong>Reason:</strong> <?php echo htmlspecialchars($reason); ?></p>
                <p><strong>Your Slot Time:</strong> <?php echo $assigned_time; ?> Minutes</p>
            </div>

        <?php } else { ?>
            <h2 class="error">Registration Failed ❌</h2>
        <?php } ?>

        <br>
        <a href="index.html">
            <button class="submit-btn">Go Back</button>
        </a>

    </div>
</div>

</body>
</html>
