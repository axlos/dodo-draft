import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Email } from "../models/email.model";


@Injectable()
export class EmailService {

  constructor(
    private http: HttpClient
  ) {
  }

  public send(email: Email): Observable<any> {
    return this.http.post(`/api/emails`, email);
  }
}
