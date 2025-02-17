import { Component, computed, OnInit, Signal } from '@angular/core';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionList, Question, Section, Answer } from './components/classes/classes';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe],
})

export class AppComponent implements OnInit {
  title = 'Practice Quiz'

  allQuestions:QuestionList = new QuestionList;
  questions:QuestionList = new QuestionList;

  correct = signal<number>(0);
  total = signal<number>(0);

  //shows a wait or error screen as needed
  loaded = signal<boolean>(false);
  loading = signal<boolean>(true);
  begin = signal<boolean>(false);
  complete = signal<boolean>(false);
  help = signal<boolean>(false);

  //error message texts
  errorHeader = 'Error';
  errorMessage = 'Please contact Ryan B. apparently something has gone terribly wrong, and the questions list cannot be loaded.';

  //loading message texts
  loadingHeader = 'Loading';
  loadingMessage = 'Please wait, the question list is loading...';

  //lets us grab the json scope questions as text
  private httpClient: HttpClient;
  private datePipe: DatePipe;

  constructor(http: HttpClient, datePipe: DatePipe) {
    this.httpClient = http;
    this.datePipe = datePipe;
  }

  ngOnInit() {
    //attempt to load the question json so we can generate the body of the page
    this.getQuestionList();
  }

  getQuestionList():void {
    try {
      this.httpClient.get('assets/generated_questions.json', {responseType: 'text'}).subscribe(data => {
        //console.log(data);
        try {
          this.allQuestions = JSON.parse(data) as QuestionList;
          //set success true will only occur if the catch block doesn't fire
          //setTimeout(() => {
          this.loaded.set(true);
          //}, 1000);
        }
        catch(error) {
          console.log(error);
        }
      });
    }
    catch(error) {
      console.log(error);
    }
    //set loading false so the fatal error message comes up if needed
    //setTimeout(() => {
      this.loading.set(false);
    //}, 3000);
  }

  resetQuestions(): void {
    this.correct.set(0);
    this.total.set(0);

    this.allQuestions.sections.forEach((sections) => {
      sections.questions.forEach((question) => {
        question.answers.forEach((answer) => {
          answer.selected = false;
        });
      });
    });
  }

  beginQuiz() {
    if (this.allQuestions.sections.find(section => section.selected === true) != undefined) {
      let selected = this.allQuestions.sections.filter(section => section.selected == true);
      let questions = new QuestionList()
      questions.sections = selected;
      this.resetQuestions();
      this.questions = questions;
      this.begin.set(true);
    }
    else { 
      console.log('no stuff selected')
    }
  }

  onGradeQuiz(): void {
    this.questions.sections.forEach((section:Section) => {
      section.questions.forEach((question:Question) => {
        //add question to total count
        this.total.set(this.total() + 1);
        question.answers.forEach((answer:Answer) => {
          if (answer.correct && answer.selected) {
            //add answer to correct count
            this.correct.set(this.correct() + 1);
          } 
        });
      });
    });

    this.complete.set(true);
    this.begin.set(false);
  }

  restart(): void {
    this.allQuestions.sections.forEach((section:Section) => {
      section.selected = false;
    })

    this.complete.set(false);
  }
}
