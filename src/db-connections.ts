import { Pool } from 'pg';

/*const pool = new Pool({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5433,
    database: 'basedatos_final'
});*/

const connectionString = 
'postgresql://finalproyect_4cy3_user:LqY9r8LWN6uSirYMoAQAb3qHFiHB5lfV@dpg-cum655l6l47c7395btr0-a.frankfurt-postgres.render.com/finalproyect_4cy3'

const pool = new Pool({
    connectionString,
})

export function query(text: any): any {
        return pool.query(text);
}