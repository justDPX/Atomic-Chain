const ELEMENTS = [
    { name: "QUARK", color: "#00d4ff", textColor: "#000" },      // 0
    { name: "PROTON", color: "#0091ff", textColor: "#fff" },     // 1
    { name: "ATOM", color: "#4d3dff", textColor: "#fff" },       // 2
    { name: "CELL", color: "#8000ff", textColor: "#fff" },       // 3
    { name: "SPARK", color: "#d400ff", textColor: "#fff" },      // 4
    { name: "PULSE", color: "#ff00d4", textColor: "#fff" },      // 5
    { name: "PLASMA", color: "#ff0066", textColor: "#fff" },     // 6
    { name: "LASER", color: "#ff4d00", textColor: "#fff" },      // 7
    { name: "STAR", color: "#ff9900", textColor: "#000" },      // 8
    { name: "NOVA", color: "#ffcc00", textColor: "#000" },       // 9
    { name: "PULSAR", color: "#ccff00", textColor: "#000" },     // 10
    { name: "QUASAR", color: "#00ffcc", textColor: "#000" },     // 11
    { name: "SINGULARITY", color: "#ffffff", textColor: "#000" },// 12
    { name: "DARK MATTER", color: "#2c3e50", textColor: "#fff" }, // 13
    { name: "EVENT HORIZON", color: "#1a1a1a", textColor: "#00f2ff" }, // 14
    { name: "BLACK HOLE", color: "#000000", textColor: "#fff" },  // 15
    { name: "GALAXY", color: "#5b2c6f", textColor: "#fff" },      // 16
    { name: "CLUSTER", color: "#1b4f72", textColor: "#fff" },     // 17
    { name: "UNIVERSE", color: "#0b5345", textColor: "#fff" },    // 18
    { name: "MULTIVERSE", color: "#641e16", textColor: "#fff" },  // 19
    { name: "OMNIVERSE", color: "#f4d03f", textColor: "#000" },   // 20
    { name: "THE BIG BANG", color: "#ffffff", textColor: "#000" } // 21
];

class Game2048 {
    constructor() {
        this.boardElement = document.getElementById('game-board');
        this.scoreElement = document.getElementById('current-score');
        this.bestScoreElement = document.getElementById('best-score');
        this.levelElement = document.getElementById('level-indicator');
        this.gameOverElement = document.getElementById('game-over');
        
        this.gridSize = 4;
        this.grid = Array(4).fill().map(() => Array(4).fill(null));
        this.tiles = [];
        this.score = 0;
        this.currentLevel = 1;
        this.bestScore = parseInt(localStorage.getItem('neon_chain_best')) || 0;

        this.init();
    }

    init() {
        this.bestScoreElement.innerText = this.bestScore;
        
        // Глобальный сброс при нажатии на кнопку New Cycle
        document.getElementById('restart-button').addEventListener('click', () => {
            if(confirm("Вы уверены, что хотите полностью сбросить прогресс и уровни?")) {
                localStorage.removeItem('neon_chain_state');
                localStorage.removeItem('neon_chain_best');
                this.currentLevel = 1;
                this.bestScore = 0;
                this.bestScoreElement.innerText = "0";
                this.restart();
            }
        });

        this.setupControls();
        
        // Загрузка сохранения или старт новой игры
        if (!this.loadGameState()) {
            this.restart();
        }
    }

    getLevelConfig() {
        const startIdx = this.currentLevel - 1;
        const targetIdx = Math.min(startIdx + 10, ELEMENTS.length - 1); 
        return {
            start: startIdx,
            target: targetIdx
        };
    }

    saveGameState() {
        const state = {
            grid: this.tiles.map(t => ({ r: t.r, c: t.c, level: t.level })),
            score: this.score,
            level: this.currentLevel
        };
        localStorage.setItem('neon_chain_state', JSON.stringify(state));
    }

    loadGameState() {
        const saved = localStorage.getItem('neon_chain_state');
        if (!saved) return false;

        const state = JSON.parse(saved);
        this.score = state.score;
        this.currentLevel = state.level || 1;
        this.updateScore(0);
        if(this.levelElement) this.levelElement.innerText = `Level ${this.currentLevel}`;

        state.grid.forEach(tData => {
            const tile = this.createTileElement(tData.r, tData.c, tData.level);
            this.grid[tData.r][tData.c] = tile;
            this.tiles.push(tile);
        });

        return true;
    }

    restart() {
        this.gameOverElement.style.display = 'none';
        this.tiles.forEach(t => t.element.remove());
        this.tiles = [];
        this.grid = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(null));
        this.score = 0;
        this.updateScore(0);
        if(this.levelElement) this.levelElement.innerText = `Level ${this.currentLevel}`;
        
        this.spawnTile();
        this.spawnTile();
        this.saveGameState();
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
            const config = this.getLevelConfig();
            // Шанс появления базового элемента уровня или следующего за ним
            const level = Math.random() < 0.9 ? config.start : config.start + 1;
            
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
        
        const inner = tile.element.querySelector('.tile-inner');
        inner.innerText = config.name;
        inner.style.color = config.textColor;

        // Динамическое свечение
        if (tile.level >= 3) {
            tile.element.classList.add('tile-super');
            const power = Math.min(tile.level - 2, 15); 
            tile.element.style.setProperty('--glow-size', `${-(power * 4)}%`);
            tile.element.style.setProperty('--glow-blur', `${(power * 6)}px`);
            tile.element.style.setProperty('--glow-opacity', Math.min(0.1 + (power * 0.05), 0.7));
        } else {
            tile.element.classList.remove('tile-super');
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
                        
                        const config = this.getLevelConfig();
                        if (tile.level === config.target) {
                            this.levelWin();
                        }

                        this.grid[nextR][nextC] = tile;
                        this.grid[currR][currC] = null;
                        tile.r = nextR; tile.c = nextC;
                        nextTile.element.remove();
                        this.tiles = this.tiles.filter(t => t !== nextTile);
                        mergedThisTurn.add(tile);
                        moved = true;
                        
                        tile.element.classList.remove('tile-merged');
                        void tile.element.offsetWidth;
                        tile.element.classList.add('tile-merged');
                        break;
                    } else break;
                }
                if (moved) this.updateTilePosition(tile);
            });
        });

        if (moved) {
            setTimeout(() => {
                this.spawnTile();
                this.saveGameState();
                if (this.checkGameOver()) this.gameOverElement.style.display = 'flex';
            }, 180);
        }
    }

    levelWin() {
        setTimeout(() => {
            this.currentLevel++;
            this.saveGameState();
            this.gameOverElement.querySelector('p').innerText = "EVOLUTION COMPLETE";
            const nextBtn = this.gameOverElement.querySelector('.btn');
            nextBtn.innerText = `Enter Level ${this.currentLevel}`;
            // Чтобы кнопка в модалке не сбрасывала всё, а просто закрывала окно
            nextBtn.onclick = () => {
                this.gameOverElement.style.display = 'none';
                if(this.levelElement) this.levelElement.innerText = `Level ${this.currentLevel}`;
            };
            this.gameOverElement.style.display = 'flex';
        }, 500);
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