import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {

  // userTasks: Task[] = [];
  userId = input.required<string>();
  private taskservice = inject(TasksService);
  // order = input<'asc' | 'desc'>(); //if using input binding
  order?:'asc' | 'desc';

  userTasks = computed(() => {
    return this.taskservice.allTasks().filter(x => x.userId === this.userId())
  })

  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    const sub = this.activatedRoute.queryParams.subscribe({
      next: (params)=> {
         this.order = params['order']
      }
    });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    })
  }

}
