import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {

  jobForm: FormGroup;
  isEditMode = false;
  jobId?: string;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.jobForm = this.fb.group({
      jobTitle: ['', Validators.required],
      jobRequisitions: ['', Validators.required],
      numberOfJobs: ['', [Validators.required, Validators.min(1)]],
      publicationDate: ['', Validators.required],
      jobDescription: ['', Validators.required],
      jobStatus: ['', Validators.required],
      jobType: ['', Validators.required],
      jobLocation: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.jobId = params['id'];
        if(this.jobId) {
          this.loadJobDetails(this.jobId);
        }        
      }
    });
  }

  loadJobDetails(jobId: string): void {
    this.jobService.getJobById(jobId).subscribe(
      (job: any) => {
        job.publicationDate = job.publicationDate ? format(new Date(job.publicationDate), 'yyyy-MM-dd', { locale: ptBR }) : '';
        this.jobForm.patchValue(job); 
      },
      error => {
        console.error('Erro ao carregar detalhes da vaga', error);
      }
    );
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      const jobData = this.jobForm.value;
      if (this.isEditMode && this.jobId !== undefined) {
        this.jobService.editJob(this.jobId, jobData).subscribe(
          () => {
            console.log('Vaga atualizada com sucesso', jobData);
            this.openSnackBar('Vaga atualizada com sucesso', 'Fechar');
            this.router.navigate(['/home']);
          },
          error => {
            console.error('Erro ao atualizar a vaga', error);
            this.openSnackBar('Erro ao atualizar a vaga', 'Fechar');
          }
        );
      } else {
        this.jobService.createJob(jobData).subscribe(
          () => {
            console.log('Vaga criada com sucesso', jobData);
            this.openSnackBar('Vaga criada com sucesso', 'Fechar');
            this.router.navigate(['/']); 
          },
          error => {
            console.error('Erro ao criar a vaga', error);
            this.openSnackBar('Erro ao criar a vaga', 'Fechar');
          }
        );
      }
    } 
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
