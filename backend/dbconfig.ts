// database.ts
import {createConnection, ConnectionOptions, DataSource} from 'typeorm';
export const AppDataSource: DataSource = new DataSource({
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
});
