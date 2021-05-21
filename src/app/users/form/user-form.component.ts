import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { EducationService } from '../services/education.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  form: FormGroup;
  user: User;
  listEducations: any[] = [];
  result: any[] = [];
  notifications: Notification[] = []

  constructor(private formBuilder: FormBuilder, 
              private userService: UserService, 
              private educationService: EducationService,
              private router: Router, 
              private route: ActivatedRoute) { }

  id = this.route.snapshot.queryParams['id'];

  ngOnInit(): void {
    this.getAllEducations();
    this.initializeForm();
    if(this.id > 0){
      this.loadFormForUpdate(); 
    }
  }

  loadFormForUpdate(){
    this.userService.GetUserById(this.id).subscribe(x => {
      this.form = this.formBuilder.group({
        id: x.result.id,
        name: x.result.name,
        surname: x.result.surname,
        email: x.result.email,
        birthDate: x.result.birthDate,
        educationId: x.result.educationId
      });
    });    
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      name: [""],
      surname: [""],
      email: [""],
      birthDate: [new Date()],
      educationId: [0],
    });
  }

  public processInfo(): void {
    let dadosForm = this.form.value;
    this.user = {
      id: dadosForm.id,
      name: dadosForm.name,
      surname: dadosForm.surname,
      email: dadosForm.email,
      birthDate: dadosForm.birthDate,
      educationId: parseInt(dadosForm.educationId)
    }
    if (this.form.valid) {
      this.saveOrUpdate(this.user);
    }
  }

  getAllEducations() {
    this.educationService.GetAllEducations().subscribe(x => {
      this.listEducations = x.result

    });

  }

  private saveOrUpdate(user: User){
    if(user.id != null){
      this.userService.UpdateUser(user).subscribe(x => {
        this.notifications = x.notifications;
      }, err => { console.log(err); this.notifications = err.error.notifications});
    }else{
      this.userService.AddUser(user).subscribe(x => {
        this.notifications = x.notifications;
      }, err => { console.log(err); this.notifications = err.error.notifications});
    }
  }
}

