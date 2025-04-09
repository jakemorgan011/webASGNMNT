class RandomCharCascade {
    constructor(options = {}) {
        // Default options
        this.defaults = {
            //deepseek used here.
            container: document.body,
            characters: '01',
            fontSize: '20px',
            color: '#0f0f0f',
            speed: 100, // ms between updates
            changeRate: 0.3, // probability a character changes each update
            cascadeDirection: 'down', // 'down', 'up', 'left', 'right'
            density: 0.002 // characters per pixel
        };

        this.settings = {...this.defaults, ...options};
        this.chars = [];
        this.init();
    }

    init() {
        // Create container for the effect
        // i used deepseak for this part cause i've never done js with containers lol.
        this.container = typeof this.settings.container === 'string'
            ? document.querySelector(this.settings.container)
            : this.settings.container;

        this.container.style.position = 'relative';
        this.container.style.overflow = 'hidden';

        const rect = this.container.getBoundingClientRect();
        const area = rect.width * rect.height;
        this.charCount = Math.floor(area * this.settings.density);

        for (let i = 0; i < this.charCount; i++) {
            this.createChar();
        }

        this.interval = setInterval(() => this.updateChars(), this.settings.speed);
    }

    createChar() {
        const char = document.createElement('div');
        char.textContent = this.getRandomChar();
        char.style.position = 'absolute';
        char.style.color = this.settings.color;
        char.style.fontSize = this.settings.fontSize;
        char.style.fontFamily = 'monospace';
        char.style.userSelect = 'none';

        // Random position
        const rect = this.container.getBoundingClientRect();
        char.style.left = `${Math.random() * rect.width}px`;
        char.style.top = `${Math.random() * rect.height}px`;

        this.container.appendChild(char);
        this.chars.push({
            element: char,
            x: parseFloat(char.style.left),
            y: parseFloat(char.style.top),
            speed: 0.5 + Math.random() * 2
        });
    }

    getRandomChar() {
        return this.settings.characters.charAt(
            Math.floor(Math.random() * this.settings.characters.length)
        );
    }

    updateChars() {
        const rect = this.container.getBoundingClientRect();

        this.chars.forEach(char => {
            // randomly change character
            if (Math.random() < this.settings.changeRate) {
                char.element.textContent = this.getRandomChar();
            }

            switch (this.settings.cascadeDirection) {
                case 'down':
                    char.y += char.speed;
                    if (char.y > rect.height) char.y = -20;
                    break;
                case 'up':
                    char.y -= char.speed;
                    if (char.y < -20) char.y = rect.height;
                    break;
                case 'left':
                    char.x -= char.speed;
                    if (char.x < -20) char.x = rect.width;
                    break;
                case 'right':
                    char.x += char.speed;
                    if (char.x > rect.width) char.x = -20;
                    break;
            }

            // Update position
            char.element.style.left = `${char.x}px`;
            char.element.style.top = `${char.y}px`;
        });
    }

    destroy() {
        clearInterval(this.interval);
        this.chars.forEach(char => char.element.remove());
        this.chars = [];
    }
}

// only used js for maxmsp so i think this works ok for a first attempt.
const cascading = new RandomCharCascade({
    container: '#cascade',
    characters: 'asdfjkl01!@#$%^&',
    color: '#0f0f0f',
    fontSize: '16px',
    density: 0.002,
    cascadeDirection: 'down'
});