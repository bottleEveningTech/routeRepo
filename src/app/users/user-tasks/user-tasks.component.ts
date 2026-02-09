import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {

  // userId = input.required<string>();
  private userService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  // userName = computed(()=> this.userService.users.find(x => x.id === this.userId())?.name);
  userName = '';

  ngOnInit(): void {
    console.log(this.activatedRoute);
    console.log(this.activatedRoute.snapshot.paramMap.get('userId')); //not re executed
    const sub = this.activatedRoute.paramMap.subscribe({
      next: (paramMap)=> {
        this.userName = this.userService.users.find(x => x.id === paramMap.get('userId'))?.name || '';
      }
    });

    this.destroyRef.onDestroy(()=> sub.unsubscribe());
  }

}
