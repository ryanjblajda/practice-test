import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SectionComponent } from './components/section/section.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProjectComponent } from './components/project/project.component';
import { FullscreenMessageComponent } from './components/fullscreen-message/fullscreen-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    FullscreenMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SectionComponent, FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
