document.addEventListener("DOMContentLoaded",function() {
    const gridsize=4;
    const gridContainer=document.querySelector(".grid-container");
    let score=0;
    let grid=[];
    let BestScore=parseInt(localStorage.getItem("best-score")) ||0;

    function createcontainer() {
        gridContainer.innerHTML="";
        grid=Array.from({length: gridsize*gridsize},() =>0);

        for (let i = 0; i < gridsize * gridsize; i++) {
			const cell = document.createElement("div");
			cell.className = "grid-cell";
            cell.style.backgroundColor="grey"
            cell.style.textAlign="center"
            cell.style.alignContent="center"
			gridContainer.appendChild(cell);
		
		}
        AddRandomTile();
    AddRandomTile();

    }
    createcontainer();

    function getRandomEmptyCell() {
		const emptyIndexes = grid
			.map((value, index) => (value === 0 ? index : -1))
			.filter((index) => index !== -1);
		const randomIndex =
			emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
		return randomIndex;
    }
    function AddRandomTile() {
		const index = getRandomEmptyCell();
		if (score == 2048) {
			alert("You win ");
			document.removeEventListener("keydown", handlePressKey);
		} else if (index !== undefined) {
			grid[index] = Math.random() < 0.9 ? 2 : 4;
			UpdateDisplay();
		} else {
			gameOver();
		}
	}
    function UpdateDisplay() {
		const cells = document.querySelectorAll(".grid-cell");
		cells.forEach((cell, index) => {
			const value = grid[index];
			cell.textContent = value !== 0 ? value : "";
			cell.style.backgroundColor =
				value !== 0 ? getTileColor(value) : "#ccc0b3";
			cell.style.color = value !== 0 ? "#776e65" : "transparent";
			cell.style.fontSize = value > 1000 ? "35px" : "40px";
		});
		if (score > BestScore) {
			document.querySelector(".span1").textContent = score;
		} else {
			document.querySelector(".span2").textContent = BestScore;
		}
		document.querySelector(".span1").textContent = score;
	}
    function getTileColor(value) {
		switch (value) {
			case 2:
				return "#eee4da";
			case 4:
				return "#ede0c8";
			case 8:
				return "#f2b179";
			case 16:
				return "#f59563";
			case 32:
				return "#f67c5f";
			case 64:
				return "#f65e3b";
			case 128:
				return "#edcf72";
			case 256:
				return "#edcc61";
			case 512:
				return "#edc850";
			case 1024:
				return "#edc53f";
			case 2048:
				return "#edc22e";
			default:
				return "#ccc0b3";
		}
	}
    function handlePressKey(event) {
		switch (event.key) {
			case "ArrowUp":
				moveUp();
				break;
			case "ArrowDown":
				moveDown();
				break;
			case "ArrowLeft":
				moveLeft();
				break;
			case "ArrowRight":
				moveRight();
				break;
		}
		UpdateDisplay();
	}
    document.addEventListener("keydown", handlePressKey);

	function moveLeft() {
		for (let row = 0; row < gridsize; row++) {
			const startIndex = row * gridsize;
			const rowValues = grid.slice(startIndex, startIndex + gridsize);
			const newRow = mergeTiles(rowValues);
			for (let col = 0; col < gridsize; col++) {
				grid[startIndex + col] = newRow[col];
			}
		}
		AddRandomTile();
	}
    function moveRight() {
		for (let row = 0; row < gridsize; row++) {
			const startIndex = row * gridsize;
			const rowValues = grid.slice(startIndex, startIndex + gridsize);
			const newRow = mergeTiles(rowValues);
			for (let col = gridsize - 1; col >= 0; col--) {
				grid[startIndex + (gridsize - 1 - col)] = newRow[col];
			}
		}
		AddRandomTile();
	}
    function moveUp() {
		for (let col = 0; col < gridsize; col++) {
			const ColumnValues = [
				grid[col],
				grid[col + gridsize],
				grid[col + 2 * gridsize],
				grid[col + 3 * gridsize],
			];
			const newCol = mergeTiles(ColumnValues);
			for (let row = 0; row < gridsize; row++) {
				grid[row * gridsize + col] = newCol[row];
			}
		}
		AddRandomTile();
	}

	function moveDown() {
		for (let col = 0; col < gridsize; col++) {
			const ColumnValues = [
				grid[col],
				grid[col + gridsize],
				grid[col + 2 * gridsize],
				grid[col + 3 * gridsize],
			];
			const newCol = mergeTiles(ColumnValues);
			for (let row = gridsize - 1; row >= 0; row--) {
				grid[(gridsize - 1 - row) * gridsize + col] = newCol[row];
			}
		}
		AddRandomTile();
	}function mergeTiles(tiles) {
		const filteredTiles = tiles.filter((value) => value !== 0); // Remove zeroes
		const mergedTiles = [];
		let skipNext = false;

		for (let i = 0; i < filteredTiles.length; i++) {
			if (skipNext) {
				skipNext = false;
				continue;
			}
			if (filteredTiles[i] === filteredTiles[i + 1]) {
				mergedTiles.push(filteredTiles[i] * 2);
				score += filteredTiles[i] * 2;
				if (BestScore < score) {
					BestScore += filteredTiles[i] * 2;
				}
				skipNext = true;
			} else {
				mergedTiles.push(filteredTiles[i]);
			}
		}

		// Add zeroes to the end
		while (mergedTiles.length < gridsize) {
			mergedTiles.push(0);
		}

		return mergedTiles;
	}
	function gameOver() {
		alert("Game Over!");
		// Optionally disable further input
		document.removeEventListener("keydown", handlePressKey);
		SaveHighscore();
	}
	function SaveHighscore() {
		if (score > BestScore) {
			BestScore = score;
			localStorage.setItem("highscore", BestScore);
		}
	}

	document.querySelector(".restart").addEventListener("click", function () {
		score = 0; // Reset the score
		document.querySelector(".span1").textContent = score;
		createcontainer();
	});

	createcontainer(); // Initial setup
});


                                                              


