"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
var pg_1 = require("pg");
/*const pool = new Pool({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5433,
    database: 'basedatos_final'
});*/
var connectionString = 'postgresql://finalproyect_4cy3_user:LqY9r8LWN6uSirYMoAQAb3qHFiHB5lfV@dpg-cum655l6l47c7395btr0-a.frankfurt-postgres.render.com/finalproyect_4cy3';
var pool = new pg_1.Pool({
    connectionString: connectionString,
});
function query(text) {
    return pool.query(text);
}
exports.query = query;
