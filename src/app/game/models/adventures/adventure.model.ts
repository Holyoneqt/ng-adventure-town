import { Enemy } from '../entities/enemy.model';

export class Adventure {

    public name: string;
    public description: string;

    public levelMin: number;
    public levelMax: number;

    public waves: number;
    public currentWave: number;

    public enemies: Enemy[];

    constructor(name: string, description: string, lvlMin: number, lvlMax: number, waves: number) {
        this.name = name;
        this.description = description;
        this.levelMin = lvlMin;
        this.levelMax = lvlMax;        
        this.waves = waves;

        this.currentWave = 1;
        this.enemies = [];
    }

    public start(): void {
        this.currentWave = 1;
        for (let i = 0; i < this.waves; i++) {
            this.enemies.push(new Enemy(this.levelMin, this.levelMax));
        }
    }

    public reset(): void {
      this.enemies = [];
    }

    public getCurrentEnemy(): Enemy {
        return this.enemies[this.currentWave - 1];
    }

    public isLastWave(): boolean {
        return this.currentWave >= this.waves;
    }

}
