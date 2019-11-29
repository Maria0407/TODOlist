import {Component, OnInit, ViewChild} from '@angular/core';
import {Todo} from "./todo";
import {TodosService} from "./todos.service";
import {MatSort, MatSortable, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  todos: Todo[] = [];
  editTodo: Todo;
  dataSource: MatTableDataSource<Todo>;
  displayedColumns = ['title','priority','created_at','actions'];
  priorities = ['желательно','важно','критично'];
  constructor(private todoService: TodosService) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(){
    this.todoService.getTodos().subscribe(todos => {
      if(!todos) {
        return
      }
      this.dataSource = new MatTableDataSource(todos);
      this.dataSource.sort = this.sort;
    })
  }

  add(title,priority: string) {
    this.editTodo = undefined;
    title = title.trim();
    priority = priority.trim()
    let created_at = new Date();
    if((!title)||(!priority)){
      return
    }
    const newTodo: Todo = {title, priority, created_at} as Todo;
    this.todoService.addTodo(newTodo).subscribe(todo => {this.todos.push(todo); this.getTodos()})
  }

  delete(todo: Todo) {
    this.todos = this.todos.filter(h => h != todo)
    this.todoService.deleteTodo(todo.id).subscribe(data => this.getTodos())
  }

  edit(todo){
    this.editTodo = todo;
  }

  update() {
    if(this.editTodo){
      this.todoService.updateTodo(this.editTodo).subscribe(todo =>{
        const ix = todo ? this.todos.findIndex(h => h.id === todo.id) : -1
        if (ix > -1){
          this.todos[ix] = todo
        }
      })
      this.editTodo = undefined
    }
  }
}
