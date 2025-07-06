<?php
header('Content-Type: application/json');
$scoresFile = __DIR__ . '/../data/scores.json';
$scores = file_exists($scoresFile) ? json_decode(file_get_contents($scoresFile), true) : [];
echo json_encode($scores);
?>
