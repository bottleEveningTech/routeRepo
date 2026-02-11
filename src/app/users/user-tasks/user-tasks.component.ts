import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet, RouterLink, ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {

  message = input.required<string>();
  // userId = input.required<string>();
  private userService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  // userName = computed(()=> this.userService.users.find(x => x.id === this.userId())?.name);
  // userName = '';
  userName = input.required<string>();

  ngOnInit(): void {
    console.log('Message', this.message());
    console.log('User Name', this.userName());
    console.log(this.activatedRoute);
  //   console.log(this.activatedRoute.snapshot.paramMap.get('userId')); //not re executed
  //   const sub = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap)=> {
  //       this.userName = this.userService.users.find(x => x.id === paramMap.get('userId'))?.name || '';
  //     }
  //   });

  //   this.destroyRef.onDestroy(()=> sub.unsubscribe());
  // }

}
}
//can add resolver function anywhere in the project
export const resolveUserName: ResolveFn<string> = (activatedRoute:ActivatedRouteSnapshot, 
  routerState: RouterStateSnapshot) => {
    const userService = inject(UsersService);
    const userName = userService.users.find(x => x.id === activatedRoute.paramMap.get('userId'))?.name || '';
    return userName;
}