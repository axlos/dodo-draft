import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Job } from "../models/job.model";
import { Observable } from "rxjs";


@Injectable()
export class JobService {

  constructor(
    private http: HttpClient
  ) {
  }

  public findAll(): Observable<Job[]> {
    return this.http.get<Job[]>(`/api/jobs`);
  }

  public findById(id: string): Observable<Job> {
    return this.http.get<Job>(`/api/jobs/${id}`);
  }

  public create(job: Job): Observable<Job> {
    return this.http.post<Job>('/api/jobs', job);
  }

  public update(id: string, job: Job): Observable<Job> {
    return this.http.put<Job>(`/api/jobs/${id}`, job);
  }

  // create a remove method that makes a delete request to /api/jobs/:id
  public remove(id: string): Observable<any> {
    return this.http.delete(`/api/jobs/${id}`);
  }
}
