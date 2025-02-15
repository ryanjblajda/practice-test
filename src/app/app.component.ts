import { Component, OnInit, Signal } from '@angular/core';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionList, Question } from './components/classes/classes';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe],
})

export class AppComponent implements OnInit {
  title = 'Practice Quiz'

  questions:QuestionList = new QuestionList;

  //shows a wait or error screen as needed
  loaded = signal<boolean>(false);
  loading = signal<boolean>(true);
  begin = signal<boolean>(false);
  help = signal<boolean>(false);

  //error message texts
  errorHeader = 'Error';
  errorMessage = 'Please contact Ryan B. apparently something has gone terribly wrong, and the questions list cannot be loaded.';

  loadExistingHeader = 'Error Loading Project Data';
  loadExistingProjectMessage = '';
  loadExistingError = signal<boolean>(false);
  errorTimeout = 5000;

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
      this.httpClient.get('assets/practice_questions.json', {responseType: 'text'}).subscribe(data => {
        //console.log(data);
        try {
          this.questions = JSON.parse(data) as QuestionList;
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
}
