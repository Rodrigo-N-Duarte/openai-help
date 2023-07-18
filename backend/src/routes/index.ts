import { FastifyInstance } from 'fastify';
import {UserController} from "../controllers/UserController";
import {AuthController} from "../controllers/AuthController";
import AuthSchema from "../schemas/AuthSchema.ts";
async function routes(fastify: FastifyInstance): Promise<void> {

    const userController = new UserController()
    const authController = new AuthController()
    const authSchema = new AuthSchema();

    // User
    fastify.get('/user/:id', userController.findById);

    // Auth
    const loginSchemaOpts = {
        schema: authSchema.login,
        handler: authController.login
    }
    const registerSchemaOpts = {
        schema: authSchema.register,
        handler: authController.register
    }
    const logoutSchemaOpts = {
        schema: authSchema.logout,
        handler: authController.logout
    }

    fastify.post("/auth/login", loginSchemaOpts);
    fastify.post("/auth/register", registerSchemaOpts)
    fastify.post("/auth/logout/:id", logoutSchemaOpts)
}

export default routes;
