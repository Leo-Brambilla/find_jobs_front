import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';


@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'http://localhost:8080/jobs'; 

  constructor(private http: HttpClient) { }

  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }
}
