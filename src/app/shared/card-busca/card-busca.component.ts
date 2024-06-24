import { Component, OnInit, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobService } from 'src/app/services/job.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-card-busca',
  templateUrl: './card-busca.component.html',
  styleUrls: ['./card-busca.component.scss']
})
export class CardBuscaComponent implements OnInit {

  readonly panelOpenState = signal(false);


  jobs: any[] = [];

  constructor(
    private jobService: JobService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getJobs();
  }
  getJobs(): void {
    this.jobService.getAlljobs().subscribe(
      (data: any[]) => {
        this.jobs = data;
      }
    )
  }

  editJob(job: any): void {
    this.router.navigate(['/edit-job', job.id]);

  }
  deleteJob(job: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.jobService.deleteJob(job.id).subscribe(
          () => {
            console.log('Vaga excluída com sucesso', job);
            this.openSnackBar('Vaga excluída com sucesso', 'Fechar');
            this.getJobs(); // Atualiza a lista de vagas após exclusão
          },
          error => {
            console.error('Erro ao excluir a vaga', error);
            this.openSnackBar('Erro ao excluir a vaga', 'Fechar');
          }
        );
      }
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
