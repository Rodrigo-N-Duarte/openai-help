import { FastifyInstance } from 'fastify';
import {UserController} from "../controllers/UserController";
import {AuthController} from "../controllers/AuthController";
import {ItemController} from "../controllers/ItemController";
import AuthSchema from "../schemas/AuthSchema.ts";
import {ItemSchema} from "../schemas/ItemSchema";
import {UserSchema} from "../schemas/UserSchema.ts";
async function routes(fastify: FastifyInstance): Promise<void> {

    const userController = new UserController()
    const itemController = new ItemController()
    const authController = new AuthController()

    const authSchema = new AuthSchema();
    const itemSchema = new ItemSchema();
    const userSchema = new UserSchema();


    // User
    fastify.get('/user/:id', {
        schema: userSchema.findById,
        handler: userController.findById
    });
    fastify.get('/user', {
        handler: userController.findAll
    });


    // Item
    fastify.post("/item/create", {
        schema: itemSchema.create,
        handler: itemController.createItem
    })
    fastify.post("/item/purchase", {
        schema: itemSchema.purchase,
        handler: itemController.purchaseItem
    })
    fastify.get("/item/:userId", {
        schema: itemSchema.getAllByUserId,
        handler: itemController.getAll
    })


    // Auth
    fastify.post("/auth/login", {
        schema: authSchema.login,
        handler: authController.login
    });
    fastify.post("/auth/register", {
        schema: authSchema.register,
        handler: authController.register
    })
    fastify.post("/auth/logout/:id", {
        schema: authSchema.logout,
        handler: authController.logout
    })
}

export default routes;
