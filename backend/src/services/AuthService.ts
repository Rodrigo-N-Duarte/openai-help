import {UserService} from "./UserService";
import User from "../models/User";
import {Messages} from "../utils/Messages";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userService = new UserService()

export class AuthService {
    async login(req: any, reply: any) {
        const {email, password} = req.body
        if (!email || !password) {
            return reply.status(422).send("Dados faltantes")
        }
        const userExists: null | User = await User.findByEmail(email);
        if (userExists) {
            const passwordMatch = await bcrypt.compare(password, userExists.password)
            if (!passwordMatch) {
                return reply.status(404).send("Senha inválida")
            }
            const secret = "!I!JBFS987D3#gv#$G509GH89NV0098V7$Vvy54#@"
            const token = jwt.sign({id: userExists?.id, email: userExists?.email, name: userExists.name}, secret)
            return reply.send(token)
        }
        return reply.status(422).send("Usuário não encontrado")
    }

    async register(req: any, reply: any) {
        const {name, email, password} = req.body
        if (!name || !email || !password) {
            return reply.status(422).send("Dados faltantes")
        }
        const userExists: null | User = await User.findByEmail(email);
        if (userExists) {
            return reply.status(400).send("Email já existente")
        }
        if (!email.includes('@' || email.includes(' ') || !email.includes('.'))) {
            return reply.status(404).send("Email inválido")
        }
        const salt: any = await bcrypt.genSalt(12)
        const hash: any = await bcrypt.hash(password, salt)

        try {
            const user: User = new User()
            user.name = name
            user.email = email
            user.password = hash
            await user.save()
            return reply.send("Usuário criado com sucesso")
        }
        catch (e) {
            return reply.status(400).send(Messages.erro)
        }
    }
}