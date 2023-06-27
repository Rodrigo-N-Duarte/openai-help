import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {UserController} from "../controllers/UserController";
async function routes(fastify: FastifyInstance): Promise<void> {

    const userController = new UserController()

    fastify.get('/user', userController.findAll);
    fastify.get('/user/:id', userController.findById);
    fastify.post('/user', userController.createUser);
    fastify.put('/user', userController.updateUser);
}

export default routes;
