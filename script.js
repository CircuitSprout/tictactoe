document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.ticGrid');
    const cells = document.querySelectorAll('.ticGrid section');
    let currentPlayer = 'X';
    const board = Array(9).fill(null);

    // Add click event listeners to each cell
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            // Check if the cell is already occupied
            if (board[index] !== null) return;

            // Update the board and display the current player's mark
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;

            // Check for a winner
            if (checkWinner()) {
                alert(`${currentPlayer} wins!`);
                resetBoard();
                return;
            }

            // Check for a draw
            if (board.every(cell => cell !== null)) {
                alert("It's a draw!");
                resetBoard();
                return;
            }

            // Switch to the other player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        });
    });

    // Function to check for a winner
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]            // Diagonals
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return board[a] !== null && board[a] === board[b] && board[a] === board[c];
        });
    }

    // Function to reset the board
    function resetBoard() {
        board.fill(null);
        cells.forEach(cell => (cell.textContent = ''));
        currentPlayer = 'X';
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // Create the floating image
    const img = document.createElement('img');
    img.src = './images/clearskies.png';
    img.alt = 'Decoration';
    img.style.position = 'absolute';
    img.style.top = '10px';
    img.style.left = '10px';
    img.style.width = '100px';
    img.style.opacity = '0.8';
    document.body.appendChild(img);

    // Variables for animation
    let x = 10; // Initial x position
    let y = 10; // Initial y position
    let xDirection = 1; // Direction for x-axis movement (1 = right, -1 = left)
    let yDirection = 1; // Direction for y-axis movement (1 = down, -1 = up)
    const speed = 2; // Speed of movement

    // Function to animate the image
    function animateImage() {
        // Update position
        x += xDirection * speed;
        y += yDirection * speed;

        // Check for boundaries and reverse direction if needed
        if (x + img.offsetWidth >= window.innerWidth || x <= 0) {
            xDirection *= -1; // Reverse x direction
        }
        if (y + img.offsetHeight >= window.innerHeight || y <= 0) {
            yDirection *= -1; // Reverse y direction
        }

        // Apply the new position
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;

        // Request the next animation frame
        requestAnimationFrame(animateImage);
    }

    // Start the animation
    animateImage();
});
document.addEventListener('DOMContentLoaded', () => {
    const numberOfImages = 5; // Number of floating images
    const images = []; // Array to store image elements

    // Create multiple floating images
    for (let i = 0; i < numberOfImages; i++) {
        const img = document.createElement('img');
        img.src = './images/clearskies.png';
        img.alt = 'Decoration';
        img.style.position = 'absolute';
        img.style.width = '100px';
        img.style.opacity = '0.8';

        // Randomize initial position
        img.style.top = `${Math.random() * (window.innerHeight - 100)}px`; // Subtract image height
        img.style.left = `${Math.random() * (window.innerWidth - 100)}px`; // Subtract image width

        document.body.appendChild(img);
        images.push({
            element: img,
            x: parseFloat(img.style.left),
            y: parseFloat(img.style.top),
            xDirection: Math.random() > 0.5 ? 1 : -1, // Random initial direction
            yDirection: Math.random() > 0.5 ? 1 : -1,
            speed: Math.random() * 2 + 1 // Random speed between 1 and 3
        });
    }

    // Function to animate all images
    function animateImages() {
        images.forEach(image => {
            // Update position
            image.x += image.xDirection * image.speed;
            image.y += image.yDirection * image.speed;

            // Check for boundaries and reverse direction if needed
            if (image.x + image.element.offsetWidth >= window.innerWidth) {
                image.x = window.innerWidth - image.element.offsetWidth; // Clamp position
                image.xDirection *= -1; // Reverse x direction
            }
            if (image.x <= 0) {
                image.x = 0; // Clamp position
                image.xDirection *= -1;
            }
            if (image.y + image.element.offsetHeight >= window.innerHeight) {
                image.y = window.innerHeight - image.element.offsetHeight; // Clamp position
                image.yDirection *= -1; // Reverse y direction
            }
            if (image.y <= 0) {
                image.y = 0; // Clamp position
                image.yDirection *= -1;
            }

            // Apply the new position
            image.element.style.left = `${image.x}px`;
            image.element.style.top = `${image.y}px`;
        });

        // Request the next animation frame
        requestAnimationFrame(animateImages);
    }

    // Start the animation
    animateImages();
});