import { FastifyRequest, FastifyReply } from 'fastify';
import {UserService} from "../services/UserService";

const userService = new UserService()
export class UserController {
    async findById(req: FastifyRequest, reply: FastifyReply) {
        return await userService.findByParamId(req, reply);
    }
}
