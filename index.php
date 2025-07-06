<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Memory Game</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body class="bg-light">
    <div class="container text-center mt-5">
        <h1>🧠 Memory Game</h1>
        <p>Finde alle Paare so schnell wie möglich!</p>
        <div id="gameBoard" class="d-flex flex-wrap justify-content-center"></div>
        <p id="moves" class="mt-3">Züge: 0</p>
        <button id="restartButton" class="btn btn-primary mt-2">🔄 Nochmal spielen</button>
        <div id="highscores" class="mt-4"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>
