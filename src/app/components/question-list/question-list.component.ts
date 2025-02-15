import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms'; 
import { Question, QuestionList} from '../classes/classes';
import { signal, Input } from '@angular/core';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})

export class ProjectComponent implements OnInit, OnChanges {
  @Input() questions:QuestionList = new QuestionList;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
