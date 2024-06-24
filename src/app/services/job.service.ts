import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from 'src/app/models/job.model';



@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'http://localhost:8080/jobs'; 

  constructor(private http: HttpClient) { }

  getAlljobs(): Observable<Job[]>{
    return this.http.get<Job[]>(this.apiUrl);
  }
  getJobById(id: string): Observable<Job> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Job>(url);
  }
  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }
  editJob(id: string, job: Job): Observable<Job> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Job>(url, job);
  }
  deleteJob(jobId: string): Observable<any> {
    const url = `${this.apiUrl}/${jobId}`;
    return this.http.delete<any>(url);
  }
}
