import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Profile } from "../models/profile.model";
import { SuggestVariant } from "../models/suggest-variant.model";

@Injectable()
export class ProfileService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getProfile(): Observable<Profile> {
    return this.http.get<Profile>('/api/profiles');
  }

  public upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`/api/profiles/upload`, formData);
  }


  public save(profile: Partial<Profile>): Observable<Profile> {
    return this.http.put<Profile>('/api/profiles', profile);
  }

  public suggestVariants(content: string): Observable<SuggestVariant[]> {
    return this.http.post<SuggestVariant[]>('/api/profiles/suggestVariants', {
      content
    });
  }
}
