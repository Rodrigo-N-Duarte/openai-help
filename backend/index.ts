import 'reflect-metadata';
import Fastify from 'fastify';
import routes from "./src/routes";
import {AppDataSource} from "./dbconfig";
import cors from '@fastify/cors'

const fastify = Fastify({
    logger: true
});

fastify.register(cors)
fastify.register(routes);

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        fastify.listen({ port: 3000 }, function (err, address) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            console.log(`Servidor rodando em ${address}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
