import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

import { map } from 'rxjs/operators';
import { BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public AddUser(user: User){
    return this.httpClient.post<any>(BASE_URL + 'api/users', user).pipe(map(x => x));
  }
  public UpdateUser(user: User){
    return this.httpClient.put<any>(BASE_URL + 'api/users/' + user.id, user).pipe(map(x => x));
  }
  public GetAllUsers(){
    return this.httpClient.get<any[]>(BASE_URL + 'api/users').pipe(map(x => x));
  }
  public DeleteUser(id: number){
    return this.httpClient.delete(BASE_URL + 'api/users/' + id);
  }

  public GetUserById(id: number){
    return this.httpClient.get<any>(BASE_URL + 'api/users/' + id);
  }
}
