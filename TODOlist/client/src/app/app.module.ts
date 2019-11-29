import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {TodosComponent} from "./todos/todos.component";
import {HttpErrorHandlerService} from "./http-error-handler.service";
import {MessageService} from "./message.service";
import {MatTableModule, MatSortModule } from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSortModule,
    MatTableModule,
    BrowserAnimationsModule
  ],
  providers: [MessageService, HttpErrorHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
