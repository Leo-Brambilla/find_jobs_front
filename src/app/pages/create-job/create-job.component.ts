import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent {
  jobForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private snackBar: MatSnackBar
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

  onSubmit() {
    if (this.jobForm.valid) {
      const job: Job = this.jobForm.value;
      this.jobService.createJob(job).subscribe(
        response => {
          this.snackBar.open('Vaga criada com sucesso!', 'Fechar', { duration: 3000 });
          this.jobForm.reset();
        },
        error => {
          this.snackBar.open('Erro ao criar vaga', 'Fechar', { duration: 3000 });
          console.error(error);
        }
      );
    }
  }
}
