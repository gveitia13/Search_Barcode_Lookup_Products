# SearchProducts

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

## Clone the project
`$ git clone https://github.com/gveitia13/Search_Barcode_Lookup_Products`

`$ cd Search_Barcode_Lookup_Products`

## Install dependencies
`$ npm install`

## Start server
`$ npm run start`

### Open in browser: http://localhost:4200

--------------------------------------------

## Description

Debido a que la API Barcode-lookup tiene restringido el Cors Origin, se configuró un proxy local para poder simular que el proyecto y la APi pertenecen al mismo dominio.

### Para que funcione hay que correrlo local

------

## URL pública

https://angular-barcodelookup.vercel.app/

(Esto dará conflicto con los Cors Origin, por lo que se recomienda correrlo local)

-------------

## Repositorio de Docker

https://hub.docker.com/r/lilstar13/barcode-api

Run `docker pull lilstar13/barcode-api`

Para correrlo local `docker run -d -it -p 80:80/tcp --name barcode-api lilstar13/barcode-api:latest`
