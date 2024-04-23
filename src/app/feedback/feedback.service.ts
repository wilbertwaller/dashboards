import { Injectable } from '@angular/core';
import { Feedback } from './feedback.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private _feedback: Feedback[] = [];
  feedback = new BehaviorSubject<Feedback[]>(this._feedback);

  constructor() {}

  addFeedback(feedback: Feedback): void {
    this._feedback.push(feedback);
    this.feedback.next(this._feedback);
  }
}
