let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player's turn (O) or AI's turn (X)

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true; // Reset to player's turn
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O"; // Player makes a move
            box.disabled = true;
            if (!checkWinner()) {
                turnO = false; // Switch turn to AI
                setTimeout(aiTurn, 1000); // Delay AI's turn by 1 second
            }
        }
    });
});

const aiTurn = () => {
    const availableBoxes = [...boxes].filter(box => box.innerText === "");
    if (availableBoxes.length > 0) {
        const randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        randomBox.innerText = "X"; // AI makes a move
        randomBox.disabled = true;
        checkWinner();
        turnO = true; // Switch turn back to player
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true; // Winner found
            }
        }
    }
    // Check for a draw
    if ([...boxes].every(box => box.innerText !== "")) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
        return true;
    }
    return false; // No winner
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
