import { v4 as uuid } from 'uuid';

export class Dashboard {
  id = uuid();
  name = '';
  group = '';
  isExercise = false;
  isArchived = false;

  constructor(data: Partial<Dashboard>) {
    if (!data.group) data.group = 'Unassociated';
    Object.assign(this, data);
  }
}