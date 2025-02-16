import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SectionComponent } from './components/section/section.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProjectComponent } from './components/question-list/question-list.component';
import { FullscreenMessageComponent } from './components/fullscreen-message/fullscreen-message.component';
import { HelpComponent } from './components/help/help.component';
import { QuestionRecursiveComponent } from "./components/question-recursive/question-recursive.component";

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    FullscreenMessageComponent,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SectionComponent, FormsModule, ReactiveFormsModule,
    QuestionRecursiveComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
