const ELEMENTS = [
    { name: "QUARK", color: "#00d4ff", textColor: "#000" },
    { name: "PROTON", color: "#0091ff", textColor: "#fff" },
    { name: "ATOM", color: "#4d3dff", textColor: "#fff" },
    { name: "CELL", color: "#8000ff", textColor: "#fff" },
    { name: "SPARK", color: "#d400ff", textColor: "#fff" },
    { name: "PULSE", color: "#ff00d4", textColor: "#fff" },
    { name: "PLASMA", color: "#ff0066", textColor: "#fff" },
    { name: "LASER", color: "#ff4d00", textColor: "#fff" },
    { name: "STAR", color: "#ff9900", textColor: "#000" },
    { name: "NOVA", color: "#ffcc00", textColor: "#000" },
    { name: "PULSAR", color: "#ccff00", textColor: "#000" },
    { name: "QUASAR", color: "#00ffcc", textColor: "#000" },
    { name: "SINGULARITY", color: "#ffffff", textColor: "#000" }
];

class Game2048 {
    constructor() {
        this.boardElement = document.getElementById('game-board');
        this.scoreElement = document.getElementById('current-score');
        this.bestScoreElement = document.getElementById('best-score');
        this.gameOverElement = document.getElementById('game-over');
        this.gridSize = 4;
        this.grid = Array(4).fill().map(() => Array(4).fill(null));
        this.score = 0;
        this.bestScore = parseInt(localStorage.getItem('neon_chain_best')) || 0;
        this.tiles = [];
        this.init();
    }

    init() {
        this.bestScoreElement.innerText = this.bestScore;
        document.getElementById('restart-button').addEventListener('click', () => this.restart());
        this.setupControls();
        this.restart();
    }

    restart() {
        this.gameOverElement.style.display = 'none';
        this.tiles.forEach(t => t.element.remove());
        this.tiles = [];
        this.grid = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(null));
        this.score = 0;
        this.updateScore(0);
        this.spawnTile();
        this.spawnTile();
    }

    updateScore(points) {
        this.score += points;
        this.scoreElement.innerText = this.score;
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            this.bestScoreElement.innerText = this.bestScore;
            localStorage.setItem('neon_chain_best', this.bestScore);
        }
    }

    spawnTile() {
        const emptyCells = [];
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                if (!this.grid[r][c]) emptyCells.push({ r, c });
            }
        }
        if (emptyCells.length > 0) {
            const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            const level = Math.random() < 0.9 ? 0 : 1;
            const tile = this.createTileElement(r, c, level);
            this.grid[r][c] = tile;
            this.tiles.push(tile);
        }
    }

    createTileElement(r, c, level) {
        const el = document.createElement('div');
        el.className = 'tile tile-new';
        el.innerHTML = `<div class="tile-inner"></div>`;
        this.boardElement.appendChild(el);
        const tile = { element: el, r, c, level };
        this.updateTilePosition(tile);
        return tile;
    }

    updateTilePosition(tile) {
        const spacing = window.innerWidth <= 420 ? 8 : 12;
        const boardWidth = this.boardElement.clientWidth;
        const tileSize = (boardWidth - (spacing * (this.gridSize + 1))) / this.gridSize;
        
        tile.element.style.width = `${tileSize}px`;
        tile.element.style.height = `${tileSize}px`;
        tile.element.style.top = `${spacing + tile.r * (tileSize + spacing)}px`;
        tile.element.style.left = `${spacing + tile.c * (tileSize + spacing)}px`;
        
        const config = ELEMENTS[tile.level] || ELEMENTS[ELEMENTS.length - 1];
        tile.element.style.backgroundColor = config.color;
        tile.element.style.color = config.color; 
        
        const inner = tile.element.querySelector('.tile-inner');
        inner.innerText = config.name;
        inner.style.color = config.textColor;

        // ПЕРЕНАСТРОЕННОЕ СВЕЧЕНИЕ
        if (tile.level >= 3) { // Начинаем с CELL
            tile.element.classList.add('tile-super');
            
            // Замедляем рост: теперь коэффициенты меньше
            const power = tile.level - 2; 

            // Размер: Plasma (6) теперь имеет -20%, а не -40%
            const glowSize = -(power * 5) + "%"; 
            // Размытие: на Plasma будет около 35px вместо 60px
            const glowBlur = (power * 8) + "px";
            // Ограничиваем прозрачность
            const glowOpacity = Math.min(0.1 + (power * 0.1), 0.6);

            tile.element.style.setProperty('--glow-size', glowSize);
            tile.element.style.setProperty('--glow-blur', glowBlur);
            tile.element.style.setProperty('--glow-opacity', glowOpacity);
        } else {
            tile.element.classList.remove('tile-super');
            tile.element.style.boxShadow = 'none';
        }
    }

    move(direction) {
        if (this.gameOverElement.style.display === 'flex') return;
        let moved = false;
        const mergedThisTurn = new Set();
        const dr = direction === 'up' ? -1 : direction === 'down' ? 1 : 0;
        const dc = direction === 'left' ? -1 : direction === 'right' ? 1 : 0;
        const range = (direction === 'down' || direction === 'right') ? [3, 2, 1, 0] : [0, 1, 2, 3];

        range.forEach(r => {
            range.forEach(c => {
                const tile = this.grid[r][c];
                if (!tile) return;
                let currR = r, currC = c;
                while (true) {
                    const nextR = currR + dr, nextC = currC + dc;
                    if (nextR < 0 || nextR >= 4 || nextC < 0 || nextC >= 4) break;
                    const nextTile = this.grid[nextR][nextC];
                    if (!nextTile) {
                        this.grid[nextR][nextC] = tile;
                        this.grid[currR][currC] = null;
                        currR = nextR; currC = nextC;
                        tile.r = currR; tile.c = currC;
                        moved = true;
                    } else if (nextTile.level === tile.level && !mergedThisTurn.has(nextTile)) {
                        tile.level++;
                        this.updateScore(Math.pow(2, tile.level + 1));
                        
                        tile.element.classList.remove('tile-merged');
                        void tile.element.offsetWidth;
                        tile.element.classList.add('tile-merged');

                        this.grid[nextR][nextC] = tile;
                        this.grid[currR][currC] = null;
                        tile.r = nextR; tile.c = nextC;
                        nextTile.element.remove();
                        this.tiles = this.tiles.filter(t => t !== nextTile);
                        mergedThisTurn.add(tile);
                        moved = true;
                        break;
                    } else break;
                }
                if (moved) this.updateTilePosition(tile);
            });
        });

        if (moved) {
            setTimeout(() => {
                this.spawnTile();
                if (this.checkGameOver()) this.gameOverElement.style.display = 'flex';
            }, 180);
        }
    }

    checkGameOver() {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (!this.grid[r][c]) return false;
                if (r < 3 && this.grid[r][c].level === this.grid[r+1][c].level) return false;
                if (c < 3 && this.grid[r][c].level === this.grid[r][c+1].level) return false;
            }
        }
        return true;
    }

    setupControls() {
        window.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            if (['w', 'arrowup'].includes(key)) this.move('up');
            if (['s', 'arrowdown'].includes(key)) this.move('down');
            if (['a', 'arrowleft'].includes(key)) this.move('left');
            if (['d', 'arrowright'].includes(key)) this.move('right');
        });
        let tsX, tsY;
        document.addEventListener('touchstart', (e) => {
            tsX = e.touches[0].clientX; tsY = e.touches[0].clientY;
        }, { passive: true });
        document.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - tsX;
            const dy = e.changedTouches[0].clientY - tsY;
            if (Math.max(Math.abs(dx), Math.abs(dy)) > 30) {
                if (Math.abs(dx) > Math.abs(dy)) this.move(dx > 0 ? 'right' : 'left');
                else this.move(dy > 0 ? 'down' : 'up');
            }
        }, { passive: true });
    }
}

window.game = new Game2048();