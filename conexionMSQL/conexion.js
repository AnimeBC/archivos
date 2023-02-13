import { createPool } from 'mariadb';
export const conexion= createPool({
    host: '127.0.0.1',
    user: 'brayan',
    password: '9898303340-Qwe',
    port: 3306,
    database: 'prueba',
});
/*
export let conexion= createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'fenix',
  port: 3306,
  database: 'animeBC',
});*/