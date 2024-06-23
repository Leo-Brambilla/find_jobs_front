import { Component } from '@angular/core';

@Component({
  selector: 'app-card-depoimentos',
  templateUrl: './card-depoimentos.component.html',
  styleUrls: ['./card-depoimentos.component.scss']
})
export class CardDepoimentosComponent {
  depoimento = `O que é Lorem Ipsum?
  Lorem Ipsum é simplesmente uma simulação de texto da indústria
  tipográfica e de impressos, e vem sendo utilizado desde o século
  XVI, quando um impressor desconhecido pegou uma bandeja de tipos
  e os embaralhou para fazer um livro de modelos de tipos. `;
  autoria = `Angela Ribeiro`
}
