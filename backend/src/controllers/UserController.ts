import { FastifyRequest, FastifyReply } from 'fastify';
import {UserService} from "../services/UserService";

const userService = new UserService()
export class UserController {
    async findById(req: any, reply: any) {
        return await userService.findByParamId(req, reply);
    }
    async findAll(req: any, reply: any) {
        return await userService.findAll(req, reply);
    }
}
