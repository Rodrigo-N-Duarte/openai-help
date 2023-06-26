import "reflect-metadata";
import Fastify from 'fastify'
const fastify = Fastify({
    logger: true
})


import {createConnection} from "typeorm";
import {User} from "./src/models/User";

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "test",
    entities: [
        User
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    // here you can start to work with your entities
}).catch(error => console.log(error));

fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
})


fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})