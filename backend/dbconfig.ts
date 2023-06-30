// database.ts
import { createConnection, ConnectionOptions } from 'typeorm';
import dotenv from "dotenv/config";
export const datasource: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'acertoDeContas',
    entities: [
        __dirname + '/src/models/*.ts'
    ],
    synchronize: true,
};

export async function connectDatabase(): Promise<void> {
    try {
        await createConnection(datasource);
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    } catch (error) {
        console.log('Erro ao conectar ao banco de dados:', error);
        process.exit(1);
    }
}
