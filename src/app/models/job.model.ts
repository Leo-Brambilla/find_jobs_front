export interface Job {
    id?: string;
    jobTitle: string;
    jobRequisitions: string;
    numberOfJobs: number;
    publicationDate: string;
    jobDescription: string;
    jobStatus: 'ABERTO' | 'FINALIZADO' | 'PAUSADO';
    jobType: 'ESTAGIO' | 'JUNIOR' | 'PLENO' | 'SENIOR';
    jobLocation: string;
  }
  