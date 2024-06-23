import { Component, OnInit, signal } from '@angular/core';
import { JobService } from './job.service';

@Component({
  selector: 'app-card-busca',
  templateUrl: './card-busca.component.html',
  styleUrls: ['./card-busca.component.scss']
})
export class CardBuscaComponent implements OnInit {

  readonly panelOpenState = signal(false);


  jobs: any[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.getJobs();    
  }

  getJobs(): void {
    this.jobService.getAllJobs().subscribe((data: any[]) => {
      this.jobs = data;
    })
    
  }

}
