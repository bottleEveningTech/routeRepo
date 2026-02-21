import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { routes as userRoutes } from "./users/user-routes";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const url = inject(Router)
    const shouldAccess = Math.random()
    return (shouldAccess < 0.5)? true : new RedirectCommand(url.parseUrl('/unauthorized'))
}

export const routes: Routes = [
    {
        path: '', //your domain localhost:4200/
        component: NoTaskComponent,
        title: 'No task selected'
    },
    {
        path: 'users/:userId', //your-domain//users/<uid>
        component: UserTasksComponent,//your-domain-tasks,
        children:userRoutes,
        data: {
            message: 'Hello'
        },
        resolve: {
            userName: resolveUserName
        },
        canMatch: [dummyCanMatch]

    },
    {
        path: '**',
        component: NotFoundComponent
    }
]