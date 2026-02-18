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
    linkRepository: 'https://github.com/wilsonrogerio/Portifolio-Pessoal'
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
  },
  {
    imgUrl: '/angular-tailwind.png',
    tecName: 'Angular + Tailwind CSS',
    descript: 'Um projeto moderno de aplicação web desenvolvido com Angular 20 e Tailwind CSS 4.',
    linkRepository: 'https://github.com/wilsonrogerio/Angular-Tailwind'
  },
  {
    imgUrl: '/reaction-time.png',
    tecName: 'HTML + JS',
    descript: 'Um projeto de mini game de teste de reflexo com media de resultados',
    linkRepository: 'https://reaction-pro-time.vercel.app/'
  }
  ]

}
