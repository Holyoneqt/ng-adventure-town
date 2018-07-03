import { Enemy } from '../entities/enemy.model';

export class Adventure {

    public name: string;
    public description: string;

    public levelMin: number;
    public levelMax: number;

    constructor(name: string, description: string, lvlMin: number, lvlMax: number) {
        this.name = name;
        this.description = description;
        this.levelMin = lvlMin;
        this.levelMax = lvlMax;        
    }

    /** @deprecated */
    public start(): void {
        // TODO: Currently obsolete
    }

    /** @deprecated */
    public reset(): void {
    }

    public getNextEnemy(): Enemy {
        return new Enemy(this.levelMin, this.levelMax);
    }

    /** @deprecated */
    public isLastWave(): boolean {
        return false;
    }

}
