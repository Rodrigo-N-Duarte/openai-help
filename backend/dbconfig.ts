// database.ts
import { createConnection, ConnectionOptions } from 'typeorm';

export const datasource: ConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
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
