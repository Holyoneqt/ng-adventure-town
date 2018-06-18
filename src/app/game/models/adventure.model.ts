import { Enemy } from './entities/enemy.model';
export class Adventure {

    public waves: number;
    public currentWave: number;

    public enemies: Enemy[];

    constructor() {
        this.waves = 5;
        this.currentWave = 1;

        this.enemies = [];
    }

    public start(): void {
        for (let i = 0; i < this.waves; i++) {
            this.enemies.push(new Enemy(1, 3));
        }
    }

    public getCurrentEnemy(): Enemy {
        return this.enemies[this.currentWave - 1];
    }

}
