import {AuthService} from "../services/AuthService";
import User from "../models/User";

const authService = new AuthService()
export class AuthController {
    async login(req: any, reply: any) {
        return authService.login(req, reply)
    }
}