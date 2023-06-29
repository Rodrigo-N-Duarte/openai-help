import {AuthService} from "../services/AuthService";
import User from "../models/User";

const authService = new AuthService()
export class AuthController {
    async login(req: any, reply: any) {
        return await authService.login(req, reply)
    }
    async register(req: any, reply: any) {
        return await authService.register(req, reply)
    }
}