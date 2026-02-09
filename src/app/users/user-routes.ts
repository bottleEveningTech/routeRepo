import { Routes } from "@angular/router";
import { TasksComponent } from "../tasks/tasks.component";
import { NewTaskComponent } from "../tasks/new-task/new-task.component";

export const routes: Routes = [
     {
                path: 'tasks',   //your-domain/users/<uid>/tasks
                component: TasksComponent
            },
            {
                path: 'tasks/new',
                component: NewTaskComponent
            },
            {
                path:'',
                redirectTo: 'tasks',
                pathMatch: 'prefix' //'full and 'prefix'
            }
]