export class Dashboard {
  isArchived = false;

  constructor(
    public id: string,
    public name: string,
    public group: string,
    public isExercise: boolean
  ) {}
}