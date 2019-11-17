# MoriWeb


Publicado em:
Front-End Angular:   https://moriweb.azurewebsites.net/

Back-End C#:		 http://moriapi.azurewebsites.net/swagger/


API com propósito de ler Lista de Amigos com suas localizações de Latitude e Longitude
GET /api/Friends

Ao buscar um amigo pelo ID no endpoint
GET /api/Friends/{id}
é Retornado os dados do amigo selecionado e os 3 amigos mais próximos 
o campo distance indica a distancia considerando a curvatura do planeta e o campo distanceFlat indica a distancia considerando
o mundo plano conforme solicitado no teste.

Também foram criado endpoints para o cadastro CRUD de Amigos 
POST /api/Friends
PUT /api/Friends
DELETE /api/Friends/{id}


O histórico dos calculos realizados pode ser consultado no endpoint 
GET /api/CalculoHistoricoLog


Todos os EndPoints precisam ser autenticados com o User-Token no Header, para este teste não habilitei a validacão da assinatura 
do Token JWT 
pode se usar para teste o token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MSwiY29kZSI6IjEyMyIsIm5hbWUiOiIxMjMiLCJlbmFibGVkICI6dHJ1ZSwiZW1haWwiOiJmZWxpcGVkbW9yaUBnbWFpbC5jb20iLCJsb2dpbiI6ImZlbGlwZWRtb3JpIn19.Clu4woC_NvS5VSpkEYAalxb_v1RfRvEZQZJ0GuBbf9w


Ou criar um Token JWT com o JSON no seguinte formato:
{
	"user": {
		"userId": 1,
		"code": "123",
		"name": "123",
		"enabled ": true,
		"email ": "felipedmori@gmail.com",
		"login ": "felipedmori"
	}
}


O Script para Criaçao do Banco de Dados esta no arquivo script.sql

Testes Unitários Criados para as funções de cálculo.



O Fron-End para Consumir a API foi criado em Angular e exibe um combo com a lista de amigos e ao selecionar um 
exibe abaixo os detalhes e a lista com os 3 amigos mais próximos. 
Também marca no mapa Google maps ao lado o amigo selecionado com um icone azul e os 3 amigos mais próximos com icone em vermelho




# MoriWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
