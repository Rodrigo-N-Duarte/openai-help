import {UserService} from "./UserService";
import User from "../models/User";
import {Messages} from "../utils/Messages";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv/config'
import validator from 'validator'

const userService = new UserService()

export class AuthService {
    async authenticateToken(req: any, reply: any, next: any) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader?.split(' ')[1]
        if (!token) {
            return reply.status(401).send("Acesso negado")
        }
        jwt.verify(token, String(process.env.JWT_SECRET), (err: any) => {
            if (err) return reply.status(403).send("Acesso negado com o token inserido")
            next()
        })
    }

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
            const token = jwt.sign({id: userExists?.id}, String(process.env.JWT_SECRET))
            return reply.send(token)
        }
        return reply.status(422).send("Usuário não encontrado")
    }

    async register(req: any, reply: any) {
        const {name, email, password, confirmPassword} = req.body
        try {
            const validation = await this.validRegister(name, email, password, confirmPassword)
            if (validation) {
                return reply.status(400).send(validation)
            }
            const salt: any = await bcrypt.genSalt(12)
            const hash: any = await bcrypt.hash(password, salt)
            const user: User = new User()
            user.name = name
            user.email = email
            user.password = hash
            await user.save()
            const token = jwt.sign({id: user?.id}, String(process.env.JWT_SECRET))
            return reply.send(token)
        }
        catch (e) {
            return reply.status(400).send(Messages.erro)
        }
    }

    private async validRegister(name: string, email: string, password: string, confirmPassword: string) {
        let validation: string | null = null
        if (validator.isEmpty(name.trim()) || validator.isEmpty(email.trim()) || validator.isEmpty(password.trim())) {
            validation = "Dados faltantes"
        }
        const userExists: null | User = await User.findByEmail(email);
        if (userExists) {
            validation = "Email já existente, tente outro"
        }
        if (!validator.isEmail(email)) {
            validation = "Email inválido"
        }
        if (!validator.isLength(password, {min: 5, max: 20})) {
            validation = "A senha não pode ter mais que 20 caracteres nem ter menos que 5 dígitos"
        }
        if (password !== confirmPassword) {
            validation = "As senhas são diferentes"
        }
        return validation
    }
}
