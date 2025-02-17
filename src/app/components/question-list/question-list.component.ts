import { Component, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms'; 
import { Question, QuestionList} from '../classes/classes';
import { signal, Input, Output } from '@angular/core';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})

export class ProjectComponent implements OnInit, OnChanges {
  @Input() questions:QuestionList = new QuestionList;
  @Output() grade = new EventEmitter();
  questionSelected = signal<number>(0);
  sectionSelected = signal<number>(0);

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onNext(): void {
    console.log(this.questions.sections[this.sectionSelected()].questions.length, this.questionSelected())
    if (this.questionSelected() < this.questions.sections[this.sectionSelected()].questions.length - 1) {
      this.questionSelected.set(this.questionSelected() + 1);
    }
    else {
      if (this.sectionSelected() < this.questions.sections.length - 1) {
        this.sectionSelected.set(this.sectionSelected() + 1);
      }
      else {
        //do finish logic here.
        console.log('end of quiz')
        this.grade.emit();
        return;
      }
      this.questionSelected.set(0);
    }
  }

  onPrevious(): void {
    if (this.questionSelected() > 0) {
      this.questionSelected.set(this.questionSelected() - 1);
    }
  }
}
