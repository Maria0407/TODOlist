import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {HandleError, HttpErrorHandlerService} from "../http-error-handler.service";
import {Observable} from "rxjs";

import {catchError} from "rxjs/operators";
import {Todo} from "./todo";

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private handleError: HandleError

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError("TodosService")
  }

  getTodos(): Observable<Todo[]>{
    return this.http
      .get<Todo[]>('api/todos')
      .pipe(catchError(this.handleError('getTodos',[])))
  }

  addTodo(todo: Todo): Observable<Todo>{
    return this.http
      .post<Todo>('api/todos',todo)
      .pipe(catchError(this.handleError('addTodo',todo)))
  }

  deleteTodo(id: number): Observable<{}>{
    return this.http
      .delete(`api/todos/${id}`)
      .pipe(catchError(this.handleError('deleteTodo')))
  }

  updateTodo(todo: Todo): Observable<Todo>{
    return this.http
      .put<Todo>(`api/todos/${todo.id}`,todo)
      .pipe(catchError(this.handleError('updateTodo',todo)))
  }
}
