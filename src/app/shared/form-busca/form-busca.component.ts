import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-form-busca',
  templateUrl: './form-busca.component.html',
  styleUrls: ['./form-busca.component.scss']
})
export class FormBuscaComponent {
  constructor(public dialog: MatDialog) {}


}
