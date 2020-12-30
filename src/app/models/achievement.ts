export class Achievement {
    public id: number;
    public name: string;
    public description: string;
    public unlocked: boolean;
    public dateUnlocked: Date;
    public percentage: number; //to show the percentage of the users that unlocked this achievement
}