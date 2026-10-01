import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegistrationRequest } from '../../UserRegistrationRequest';
import { UserRegistrationResponse } from '../../UserRegistrationResponse';

@Injectable({
  providedIn: 'root'
})
export class User {
  private http = inject(HttpClient);

  private apiUrl = "http://localhost:8082/api/users/register";

  registerUser(request: UserRegistrationRequest): Observable<UserRegistrationResponse> {
    return this.http.post<UserRegistrationResponse>(this.apiUrl, request);
  }
}
