import { FastifyInstance } from 'fastify';
import {UserController} from "../controllers/UserController";
import {AuthController} from "../controllers/AuthController";
import {ItemController} from "../controllers/ItemController";
import AuthSchema from "../schemas/AuthSchema.ts";
import {ItemSchema} from "../schemas/ItemSchema";
import {UserSchema} from "../schemas/UserSchema.ts";
import {ItemUserController} from "../controllers/ItemUserController";
async function routes(fastify: FastifyInstance): Promise<void> {

    const userController = new UserController()
    const itemController = new ItemController()
    const authController = new AuthController()
    const itemUserController = new ItemUserController()

    const authSchema = new AuthSchema();
    const itemSchema = new ItemSchema();
    const userSchema = new UserSchema();


    // User
    fastify.get('/user/:id', {
        preHandler: authController.authenticateToken,
        schema: userSchema.findById,
        handler: userController.findById
    });
    fastify.get('/user', {
        preHandler: authController.authenticateToken,
        handler: userController.findAll
    });
    fastify.get("/user/purchase-history/:id", {
        preHandler: authController.authenticateToken,
        schema: userSchema.getHistory,
        handler: itemUserController.getPurchaseHistory
    })


    // Item
    fastify.post("/item/create", {
        preHandler: authController.authenticateToken,
        schema: itemSchema.create,
        handler: itemController.createItem
    })
    fastify.post("/item/purchase", {
        preHandler: authController.authenticateToken,
        schema: itemSchema.purchase,
        handler: itemController.purchaseItem
    })
    fastify.get("/item/:userId", {
        preHandler: authController.authenticateToken,
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
