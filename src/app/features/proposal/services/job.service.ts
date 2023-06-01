import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class JobService {

  constructor(
    private http: HttpClient
  ) {
  }


}
