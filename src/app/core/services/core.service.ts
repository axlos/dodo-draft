import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class CoreService {

  constructor(
    private http: HttpClient
  ) { }

  public upload(file: File): Observable<any>  {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`/api/profiles/upload`, formData);
  }


}
