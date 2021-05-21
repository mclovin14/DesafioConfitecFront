import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EducationService } from '../services/education.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  listUsers: any[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {        
    this.getAllUsers();

  }

 getAllUsers() {
    this.userService.GetAllUsers().subscribe(x => {
      this.listUsers = x
    });
    this.listUsers;
  }

 deleteUser(id: number) {
    this.userService.DeleteUser(id).subscribe(() => {
      window.location.reload();
    }, err => { console.log(err); });
  }

}
