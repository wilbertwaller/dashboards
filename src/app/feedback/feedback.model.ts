import { v4 as uuid } from 'uuid';

export class Feedback {
  id = uuid();
  username = '';
  title = '';
  summary = '';
  dashboardName = '';

  constructor(data: Partial<Feedback>) {
    Object.assign(this, data);
  }
}