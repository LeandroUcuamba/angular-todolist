import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Tarefa } from '../../../tarefa';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from "../task-item/task-item.component";
import { AddTaskComponent } from "../add-task/add-task.component";

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, TaskItemComponent, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{

  tarefas: Tarefa[] = [];

  constructor(private taskService: TaskService){}

  ngOnInit(): void{
     
     this.taskService.getTasks().subscribe((dado) => {
        this.tarefas = dado;
        console.log(dado);
     })

  }

  deleteTask(tarefa: Tarefa){
     this.taskService.deleteTask(tarefa).subscribe(() => 
       (this.tarefas = this.tarefas.filter((t) => t.id !== tarefa.id))
     );
  }

  toggleConcluido(tarefa: Tarefa){
     tarefa.concluido = !tarefa.concluido;
     this.taskService.updateTask(tarefa).subscribe();
  }

  AddTask(tarefa: Tarefa){
   this.taskService.addTask(tarefa).subscribe((tarefa) => {
      this.tarefas.push(tarefa);
   });
  }

}
