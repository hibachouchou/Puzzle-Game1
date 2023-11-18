document.addEventListener('DOMContentLoaded', function() {
    const puzzleContainer = document.getElementById('puzzle-container');
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    const resultElement = document.getElementById('result');

    // Fonction pour mélanger les pièces du puzzle
    function shufflePuzzle() {
        const piecesArray = Array.from(puzzlePieces);
        piecesArray.forEach(piece => {
            const randomPosition = Math.floor(Math.random() * piecesArray.length);
            puzzleContainer.appendChild(piece);
            piecesArray.splice(randomPosition, 1);
        });
    }
    // Fonction pour vérifier si le puzzle est résolu

    function checkIfPuzzleSolved() {
        const orderedPieces = Array.from(puzzlePieces).map(piece => piece.id);
        const currentPieces = Array.from(puzzleContainer.children).map(piece => piece.id);

        if (JSON.stringify(orderedPieces) === JSON.stringify(currentPieces)) {
             resultElement.textContent = 'Congratulations! Puzzle solved!';
        }
    }
  // Événement de glisser-déposer pour les pièces du puzzle
    puzzlePieces.forEach(piece => {
        piece.draggable = true;

        piece.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', piece.id);
        });

        piece.addEventListener('dragover', function(e) {
            e.preventDefault();
        });

        piece.addEventListener('drop', function(e) {
            e.preventDefault();
            const draggedPieceId = e.dataTransfer.getData('text/plain');
            const draggedPiece = document.getElementById(draggedPieceId);
 // Échange les positions des pièces
            puzzleContainer.insertBefore(draggedPiece, piece);
            checkIfPuzzleSolved();
        });
    });
 // Appel à la fonction pour mélanger les pièces au chargement de la page
    shufflePuzzle();
});
