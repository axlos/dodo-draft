import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from "../models/user.model";

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }

  public get(): Observable<User> {
    return this.http.get<User>('/api/users');
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>('/api/users', user);
  }

}
