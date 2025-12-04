import { Component } from '@angular/core';

@Component({
  selector: 'app-resumo',
  imports: [],
  templateUrl: './resumo.html',
  styleUrl: './resumo.scss',
})
export class Resumo {
  cards = [{
    imgUrl: '/portifolio.png',
    tecName: 'Angular',
    descript: 'Aplicação web desenvolvida com Angular, pagina de portifolio dinamica aplicando os conceitos modernos de Angular.',
    linkRepository: 'https://github.com/wilsonrogerio/portifoliio'
  },
  {
    imgUrl: '/nest-api.png',
    tecName: 'NestJS',
    descript: 'Api REST desenvolvida com NestJS, um framework Node.js Typescript progressivo para construção de aplicações eficientes e escaláveis.',
    linkRepository: 'https://github.com/wilsonrogerio/API-REST-NESTJS'
  },
  {
    imgUrl: '/get-pet.png',
    tecName: 'nodeJS + Express',
    descript: 'Api REST desenvolvida com NodeJS e Express, para construção de uma aplicacao Pet Adoption full stack MVC.',
    linkRepository: 'https://github.com/wilsonrogerio/MVC-Angular-Node'
  },
  {
    imgUrl: '/social-dev.png',
    tecName: 'Angular + NestJS',
    descript: 'Aplicação full stack desenvolvida com Angular no front-end e NestJS no back-end, seguindo a arquitetura MVC.',
    linkRepository: 'https://github.com/wilsonrogerio/Social-Dev'
  }
  ]

}
