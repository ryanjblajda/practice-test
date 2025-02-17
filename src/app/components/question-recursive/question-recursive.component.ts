import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Answer, Question } from '../classes/classes';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-question-recursive',
  templateUrl: './question-recursive.component.html',
  styleUrls: ['./question-recursive.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf]
})
export class QuestionRecursiveComponent {
  @Input() question!:Question;
  @Input() selected:boolean | boolean = false;
  @Input() first:boolean | boolean = false;
  @Input() last:boolean | boolean = false;
  @Input() total:number | number = 0;
  @Input() index:number | number = 0;

  @Output() next = new EventEmitter();
  @Output() previous = new EventEmitter();

  previousContent:string | string = "Previous";
  nextContent:string | string = "Next";

  onAnswerClicked(answer:Answer): void {
    this.question.answers.forEach(item => {
      if (item == answer) { item.selected = true; }
      else { item.selected = false}
    });
  }

  onNextClicked(): void {
    this.next.emit();
  }

  onPreviousClicked(): void {
    this.previous.emit();
  }
}
