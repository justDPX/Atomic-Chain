// --- CONFIGURATION BLOCK ---
const GAME_CONFIG = {
    // 🧪 РЕЖИМ ПЕСОЧНИЦЫ (Debug Mode)
    // Укажите номер уровня (1-22), чтобы мгновенно переместиться на него.
    // Оставьте 0 для обычной игры и записи рекордов.
    debugLevel: 0, 

    evolutionStepsPerLevel: 10, 
    spawnNewTileChance: 0.9,

    
    
    glow: {
        threshold: 1,
        minOpacity: 0.2,
        maxOpacity: 0.8,
        opacityStep: 0.15
    },
    
    grid: {
        size: 4,
        animationSpeed: 150
    },
    // URL твоего Google Apps Script
    leaderboardUrl: "https://script.google.com/macros/s/AKfycbyKRKxqPL5mmeY31ERIfdUAOsZUiNhaVaQN3I2oZrXRd8PLR-jGPJpuvnpsZZ-BIK8S/exec" 
};



// --- THEMES CONFIGURATION ---
const THEMES = {
    atomic: [
        { name: "QUARK", color: "#00d4ff", textColor: "#000" },      // 1
        { name: "PROTON", color: "#0091ff", textColor: "#fff" },     // 2
        { name: "ATOM", color: "#4d3dff", textColor: "#fff" },       // 3
        { name: "CELL", color: "#8000ff", textColor: "#fff" },       // 4
        { name: "SPARK", color: "#d400ff", textColor: "#fff" },      // 5
        { name: "PULSE", color: "#ff00d4", textColor: "#fff" },      // 6
        { name: "PLASMA", color: "#ff0066", textColor: "#fff" },     // 7
        { name: "LASER", color: "#ff4d00", textColor: "#fff" },      // 8
        { name: "STAR", color: "#ff9900", textColor: "#000" },      // 9
        { name: "NOVA", color: "#ffcc00", textColor: "#000" },       // 10
        { name: "PULSAR", color: "#ccff00", textColor: "#000" },     // 11
        { name: "QUASAR", color: "#00ffcc", textColor: "#000" },     // 12
        { name: "SINGULARITY", color: "#ffffff", textColor: "#000" },// 13
        { name: "DARK MATTER", color: "#2c3e50", textColor: "#fff" }, // 14
        { name: "EVENT HORIZON", color: "#1a1a1a", textColor: "#00f2ff" }, // 15
        { name: "BLACK HOLE", color: "#000000", textColor: "#fff" },  // 16
        { name: "GALAXY", color: "#5b2c6f", textColor: "#fff" },      // 17
        { name: "CLUSTER", color: "#1b4f72", textColor: "#fff" },     // 18
        { name: "UNIVERSE", color: "#0b5345", textColor: "#fff" },    // 19
        { name: "MULTIVERSE", color: "#641e16", textColor: "#fff" },  // 20
        { name: "OMNIVERSE", color: "#f4d03f", textColor: "#000" },   // 21
        { name: "THE BIG BANG", color: "#ffffff", textColor: "#000" } // 22
    ],
    fantasy: [
        { name: "DUST", color: "#8b4513", textColor: "#fff" },
        { name: "STONE", color: "#808080", textColor: "#fff" },
        { name: "IRON", color: "#b0c4de", textColor: "#000" },
        { name: "COPPER", color: "#d2691e", textColor: "#fff" },
        { name: "SILVER", color: "#c0c0c0", textColor: "#000" },
        { name: "GOLD", color: "#ffd700", textColor: "#000" },
        { name: "CRYSTAL", color: "#00ffff", textColor: "#000" },
        { name: "RUNE", color: "#4169e1", textColor: "#fff" },
        { name: "MANA", color: "#9400d3", textColor: "#fff" },
        { name: "SPELL", color: "#ff1493", textColor: "#fff" },
        { name: "WIZARD", color: "#4b0082", textColor: "#fff" },
        { name: "DRAGON", color: "#ff4500", textColor: "#fff" },
        { name: "ANCIENT", color: "#2f4f4f", textColor: "#fff" },
        { name: "DEMI-GOD", color: "#daa520", textColor: "#000" },
        { name: "GOD", color: "#ffffff", textColor: "#000" },
        { name: "TITAN", color: "#000000", textColor: "#00f2ff" },
        { name: "NIRVANA", color: "#ffdab9", textColor: "#000" },
        { name: "ETERNITY", color: "#7fffd4", textColor: "#000" },
        { name: "VOID", color: "#191970", textColor: "#fff" },
        { name: "CREATION", color: "#fff5ee", textColor: "#000" },
        { name: "CHRONOS", color: "#ffd700", textColor: "#000" },
        { name: "OMEGA", color: "#ff0000", textColor: "#fff" }
    ],
    ocean: [
        { name: "PLANKTON", color: "#e0f7fa", textColor: "#006064" },     // 1
        { name: "SHRIMP", color: "#ffab91", textColor: "#bf360c" },       // 2
        { name: "SARDINE", color: "#90a4ae", textColor: "#263238" },      // 3
        { name: "JELLYFISH", color: "#ce93d8", textColor: "#4a148c" },    // 4
        { name: "CRAB", color: "#ef5350", textColor: "#ffffff" },         // 5
        { name: "TURTLE", color: "#66bb6a", textColor: "#1b5e20" },       // 6
        { name: "STINGRAY", color: "#4db6ac", textColor: "#004d40" },     // 7
        { name: "TUNA", color: "#4fc3f7", textColor: "#01579b" },         // 8
        { name: "OCTOPUS", color: "#ba68c8", textColor: "#ffffff" },      // 9
        { name: "DOLPHIN", color: "#4dd0e1", textColor: "#006064" },      // 10
        { name: "SHARK", color: "#78909c", textColor: "#ffffff" },        // 11
        { name: "ORCA", color: "#263238", textColor: "#ffffff" },         // 12
        { name: "BLUE WHALE", color: "#0d47a1", textColor: "#ffffff" },    // 13
        { name: "GIANT SQUID", color: "#d84315", textColor: "#ffffff" },  // 14
        { name: "ANGLERFISH", color: "#3e2723", textColor: "#ffeb3b" },   // 15
        { name: "MEGALODON", color: "#455a64", textColor: "#ffffff" },    // 16
        { name: "HYDRA", color: "#1b5e20", textColor: "#b9f6ca" },        // 17
        { name: "KRAKEN", color: "#311b92", textColor: "#ffffff" },       // 18
        { name: "LEVIATHAN", color: "#000051", textColor: "#ffffff" },    // 19
        { name: "ATLANTIS", color: "#00bcd4", textColor: "#ffffff" },     // 20
        { name: "NEPTUNE", color: "#ffd700", textColor: "#000000" },      // 21
        { name: "POSEIDON", color: "#ffffff", textColor: "#006064" }      // 22
    ]
};

let ELEMENTS = THEMES.atomic;


class Game2048 {
    constructor() {
        this.boardElement = document.getElementById('game-board');
        this.scoreElement = document.getElementById('current-score');
        this.bestScoreElement = document.getElementById('best-score');
        this.levelIndicator = document.getElementById('level-indicator');
        this.progressBar = document.getElementById('progress-bar');
        this.gameOverElement = document.getElementById('game-over');
        this.sidebar = document.getElementById('levels-sidebar');
        this.isScoreSubmitted = false;
        
        this.gridSize = GAME_CONFIG.grid.size;
        this.isDebugActive = GAME_CONFIG.debugLevel && GAME_CONFIG.debugLevel > 0;
        
        if (this.isDebugActive) {
            this.currentLevel = GAME_CONFIG.debugLevel;
        } else {
            this.currentLevel = parseInt(localStorage.getItem('current_level')) || 1;
        }

        this.maxReachedLevel = parseInt(localStorage.getItem('max_reached_level')) || 1;
        this.bestScore = parseInt(localStorage.getItem('neon_chain_best')) || 0;

        this.grid = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(null));
        this.tiles = [];
        this.score = 0;

        this.init();
    }

    init() {
        this.bestScoreElement.innerText = this.bestScore;
        
        document.getElementById('restart-button').addEventListener('click', () => {
            if(confirm("Full Reset?")) { 
                localStorage.clear(); 
                location.reload(); 
            }
        });
        
        document.getElementById('menu-toggle')?.addEventListener('click', () => {
            this.sidebar.classList.add('active');
        });

        document.getElementById('close-sidebar')?.addEventListener('click', () => {
            this.sidebar.classList.remove('active');
        });

        this.setupControls();
        this.updateLevelsUI();
        
        if (!this.loadGameState()) {
            this.restart();
        }


        const nameInput = document.getElementById('player-name');
        if (nameInput) {
            nameInput.value = localStorage.getItem('atomic_explorer_name') || "";
            nameInput.addEventListener('change', (e) => {
                localStorage.setItem('atomic_explorer_name', e.target.value);
            });
        }
        this.refreshLeaderboard();
        if (this.checkGameOver()) {
            const btn = document.getElementById('msg-action-btn');
            if (btn) {
                this.gameOverElement.querySelector('p').innerText = "COLLAPSE";
                btn.innerText = "Try Again";
                btn.onclick = () => this.restart();
                this.gameOverElement.style.display = 'flex';
            }
        }
    }

    // --- МЕТОДЫ ЛИДЕРБОРДА ---
    async sendToLeaderboard(playerName) {
        if (this.isDebugActive) return;

        const data = {
            name: playerName,
            score: this.score,
            element: ELEMENTS[this.currentLevel - 1]?.name || "UNKNOWN"
        };

        try {
            await fetch(GAME_CONFIG.leaderboardUrl, {
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                body: JSON.stringify(data)
            });
            console.log("Leaderboard updated");
            // Обновляем список после отправки через небольшую задержку
            setTimeout(() => this.refreshLeaderboard(), 1000);
        } catch (e) {
            console.error("Leaderboard error:", e);
        }
    }

    async refreshLeaderboard() {
        const listContainer = document.getElementById('leaderboard-list');
        if (!listContainer) return;

        try {
            const response = await fetch(GAME_CONFIG.leaderboardUrl);
            const topScores = await response.json();
            
            if (!topScores || topScores.length === 0) {
                listContainer.innerHTML = "<div style='font-size:10px; opacity:0.5; text-align:center; padding:10px;'>No explorers yet.</div>";
                return;
            }

            listContainer.innerHTML = topScores.map((entry, i) => `
                <div class="leader-item">
                    <span class="leader-name"><span class="leader-rank">${i+1}.</span> ${entry.Name || 'Explorer'}</span>
                    <span class="leader-score">${entry.Score || 0}</span>
                </div>
            `).join('');
        } catch (e) {
            console.error("Leaderboard fetch error:", e);
            listContainer.innerHTML = "<div style='color:#ff4444; font-size:10px; text-align:center;'>Offline Mode</div>";
        }
    }

    getLevelConfig() {
        const startIdx = this.currentLevel - 1;
        const targetIdx = Math.min(startIdx + GAME_CONFIG.evolutionStepsPerLevel, ELEMENTS.length - 1); 
        return { start: startIdx, target: targetIdx };
    }

    updateLevelsUI() {
        const list = document.getElementById('levels-list');
        if (!list) return;
        list.innerHTML = '';

        const limit = this.isDebugActive ? ELEMENTS.length : 22; 

        for (let i = 1; i <= limit; i++) {
            const item = document.createElement('div');
            const isLocked = !this.isDebugActive && i > this.maxReachedLevel;
            const elName = ELEMENTS[i-1] ? ELEMENTS[i-1].name : "???";
            
            item.className = `level-item ${i === this.currentLevel ? 'active' : ''} ${isLocked ? 'locked' : ''}`;
            item.innerHTML = `<span>Stage ${i}</span><br><small>${elName}</small>`;
            
            if (!isLocked) {
                item.onclick = () => {
                    this.currentLevel = i;
                    if (!this.isDebugActive) localStorage.setItem('current_level', i);
                    this.sidebar.classList.remove('active');
                    this.restart();
                };
            }
            list.appendChild(item);
        }
        if(this.levelIndicator) this.levelIndicator.innerText = `Stage ${this.currentLevel}`;
        this.updateProgressBar();
    }

    updateProgressBar() {
        if (!this.progressBar) return;
        const { start, target } = this.getLevelConfig();
        const maxTileLevel = this.tiles.length > 0 ? Math.max(...this.tiles.map(t => t.level)) : start;
        const progress = ((maxTileLevel - start) / (target - start)) * 100;
        this.progressBar.style.width = `${Math.max(5, Math.min(progress, 100))}%`;
    }

    saveGameState() {
        const state = { 
            grid: this.tiles.map(t => ({ r: t.r, c: t.c, level: t.level })), 
            score: this.score, 
            level: this.currentLevel 
        };
        const storageKey = this.isDebugActive ? 'neon_debug_state' : 'neon_chain_state';
        localStorage.setItem(storageKey, JSON.stringify(state));
        if (!this.isDebugActive) localStorage.setItem('current_level', this.currentLevel);
    }

    loadGameState() {
        const storageKey = this.isDebugActive ? 'neon_debug_state' : 'neon_chain_state';
        const saved = localStorage.getItem(storageKey);
        if (!saved) return false;
        const state = JSON.parse(saved);
        if (state.level !== this.currentLevel) return false;
        this.score = state.score;
        this.updateScore(0);
        state.grid.forEach(tData => {
            const tile = this.createTileElement(tData.r, tData.c, tData.level);
            this.grid[tData.r][tData.c] = tile;
            this.tiles.push(tile);
        });
        this.updateProgressBar();
        return true;
    }

    restart() {
        this.isScoreSubmitted = false;
        this.gameOverElement.style.display = 'none';
        this.tiles.forEach(t => t.element.remove());
        this.tiles = [];
        this.grid = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(null));
        this.score = 0;
        this.updateScore(0);
        this.spawnTile(); this.spawnTile();
        this.updateLevelsUI();
        this.saveGameState(); 
    }

    updateScore(points) {
        this.score += points;
        this.scoreElement.innerText = this.score;
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            this.bestScoreElement.innerText = this.bestScore;
            if (!this.isDebugActive) localStorage.setItem('neon_chain_best', this.bestScore);
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
            const level = Math.random() < GAME_CONFIG.spawnNewTileChance ? config.start : config.start + 1;
            const tile = this.createTileElement(r, c, level);
            this.grid[r][c] = tile;
            this.tiles.push(tile);
        }
    }

    createTileElement(r, c, level) {
        const el = document.createElement('div');
        el.className = 'tile';
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

        const startIdx = this.currentLevel - 1;
        if (tile.level >= startIdx + GAME_CONFIG.glow.threshold) {
            tile.element.classList.add('tile-super');
            const power = tile.level - startIdx;
            const opacity = GAME_CONFIG.glow.minOpacity + (power * GAME_CONFIG.glow.opacityStep);
            tile.element.style.setProperty('--glow-opacity', Math.min(opacity, GAME_CONFIG.glow.maxOpacity));
            tile.element.style.zIndex = 10 + power;
        } else {
            tile.element.classList.add('tile-super');
            tile.element.style.setProperty('--glow-opacity', 0);
            tile.element.style.zIndex = 10;
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
                    if (nextR < 0 || nextR >= this.gridSize || nextC < 0 || nextC >= this.gridSize) break;
                    const nextTile = this.grid[nextR][nextC];
                    if (!nextTile) {
                        this.grid[nextR][nextC] = tile; this.grid[currR][currC] = null;
                        currR = nextR; currC = nextC; tile.r = currR; tile.c = currC; moved = true;
                    } else if (nextTile.level === tile.level && !mergedThisTurn.has(nextTile)) {
                        tile.level++;
                        this.updateScore(Math.pow(2, tile.level));
                        const config = this.getLevelConfig();
                        if (tile.level >= config.target) { this.levelWin(); return; }
                        this.grid[nextR][nextC] = tile; this.grid[currR][currC] = null;
                        tile.r = nextR; tile.c = nextC;
                        nextTile.element.remove();
                        this.tiles = this.tiles.filter(t => t !== nextTile);
                        mergedThisTurn.add(tile); moved = true; break;
                    } else break;
                }
                if (moved) this.updateTilePosition(tile);
            });
        });

        if (moved) {
            setTimeout(() => {
                this.spawnTile(); 
                this.updateProgressBar();
                this.saveGameState();
                if (this.checkGameOver()) {
                    this.gameOverElement.querySelector('p').innerText = "COLLAPSE";
                    const btn = document.getElementById('msg-action-btn');
                    btn.innerText = "Try Again"; 
                    
                    if (!this.isDebugActive && !this.isScoreSubmitted) {
                        const activeName = localStorage.getItem('atomic_explorer_name') || "Anonymous";
                        this.sendToLeaderboard(activeName);
                        this.isScoreSubmitted = true; // Блокируем повторную отправку
                    }
                    
                    btn.onclick = () => this.restart();
                    this.gameOverElement.style.display = 'flex';
                }
            }, GAME_CONFIG.grid.animationSpeed);
        }
    }

    levelWin() {
        const nextLevel = this.currentLevel + 1;
        if (!this.isDebugActive) {
            if (nextLevel > this.maxReachedLevel) {
                this.maxReachedLevel = nextLevel;
                localStorage.setItem('max_reached_level', this.maxReachedLevel);
            }
            localStorage.setItem('current_level', nextLevel);
        }

        this.gameOverElement.querySelector('p').innerText = "EVOLUTION COMPLETE";
        const btn = document.getElementById('msg-action-btn');
        if (btn) {
            btn.innerText = `Enter Stage ${nextLevel}`;
            btn.onclick = () => {
                this.currentLevel = nextLevel;
                this.gameOverElement.style.display = 'none';
                this.restart();
            };
        }
        this.gameOverElement.style.display = 'flex';
    }

    checkGameOver() {
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                if (!this.grid[r][c]) return false;
                if (r < this.gridSize - 1 && this.grid[r][c].level === this.grid[r+1][c].level) return false;
                if (c < this.gridSize - 1 && this.grid[r][c].level === this.grid[r][c+1].level) return false;
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
        document.addEventListener('touchstart', (e) => { tsX = e.touches[0].clientX; tsY = e.touches[0].clientY; }, { passive: true });
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

function changeGameTheme(themeKey, element) {
    if (THEMES[themeKey]) {
        // Меняем набор элементов
        ELEMENTS = THEMES[themeKey];
        
        // Сохраняем в память
        localStorage.setItem('selected_theme', themeKey);
        
        document.body.className = `theme-${themeKey}`;
        // Перезапускаем игру через глобальный объект window.game
        if (window.game) {
            window.game.restart();
            window.game.updateLevelsUI(); // Обновляем список слева
        }

        // Переключаем подсветку кнопок
        
        document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
        if (element) {
            element.classList.add('active');
        } else {
            // Если вызвано без element (при загрузке), ищем кнопку по тексту
            document.querySelectorAll('.theme-btn').forEach(btn => {
                if (btn.innerText.toLowerCase() === themeKey.toLowerCase()) btn.classList.add('active');
            });
        }
        
        console.log("Theme shifted to:", themeKey);
    }
}

// 2. Инициализация темы при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selected_theme') || 'atomic';
    
    // Применяем сохраненную тему
    ELEMENTS = THEMES[savedTheme];
    
    // Обновляем визуальный статус кнопок
    changeGameTheme(savedTheme);
});
window.game = new Game2048();