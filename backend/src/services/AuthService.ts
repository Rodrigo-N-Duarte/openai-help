import {UserService} from "./UserService";
import User from "../models/User";
const userService = new UserService()
export class AuthService {
    async login(req, reply) {
        const user = await User.findById(req.params.id)
        if (user) {
            const body = req.body
            if (body.email === user.email && body.password === user.password) {
                console.log("deu")
            }
        }
        return reply.status(400).send({erro: true, message: "Usuário não encontrado"})
    }
}