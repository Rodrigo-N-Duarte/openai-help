import { FastifyInstance } from 'fastify';
import {UserController} from "../controllers/UserController";
import {AuthController} from "../controllers/AuthController";
import {ItemController} from "../controllers/ItemController";
import AuthSchema from "../schemas/AuthSchema.ts";
import {ItemSchema} from "../schemas/ItemSchema";
async function routes(fastify: FastifyInstance): Promise<void> {

    const userController = new UserController()
    const itemController = new ItemController()
    const authController = new AuthController()

    const authSchema = new AuthSchema();
    const itemSchema = new ItemSchema();


    // User
    fastify.get('/user/:id', userController.findById);



    // Item
    const createItemOpts = {
        schema: itemSchema.create,
        handler: itemController.createItem
    }
    fastify.post("/item/create", createItemOpts)
    const purchaseItemOpts = {
        schema: itemSchema.purchase,
        handler: itemController.purchaseItem
    }
    fastify.post("/item/purchase", purchaseItemOpts)



    // Auth
    const loginSchemaOpts = {
        schema: authSchema.login,
        handler: authController.login
    }
    fastify.post("/auth/login", loginSchemaOpts);

    const registerSchemaOpts = {
        schema: authSchema.register,
        handler: authController.register
    }
    fastify.post("/auth/register", registerSchemaOpts)

    const logoutSchemaOpts = {
        schema: authSchema.logout,
        handler: authController.logout
    }
    fastify.post("/auth/logout/:id", logoutSchemaOpts)
}

export default routes;
