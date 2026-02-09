import { Component, computed, inject, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  // userTasks: Task[] = [];
  userId = input.required<string>();
  private taskservice = inject(TasksService);
  order = input<'asc' | 'desc'>();

  userTasks = computed(()=> {
    return this.taskservice.allTasks().filter(x => x.userId === this.userId())
  })

}
