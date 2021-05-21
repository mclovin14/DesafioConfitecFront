import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private httpClient: HttpClient) { }

  public GetAllEducations(){
    return this.httpClient.get<any>(BASE_URL + 'api/education').pipe(map(x => x));
  }
}
