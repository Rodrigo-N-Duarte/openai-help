import {UserService} from "./UserService";
import User from "../models/User";
import {Messages} from "../utils/Messages";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()
import validator from 'validator'
import {UserHistoryEnum} from "../enum/UserHistoryEnum.ts";
import {UserHistoryService} from "./UserHistoryService.ts";

export class AuthService {
    userService = new UserService()
    userHistoryService = new UserHistoryService()
    async authenticateToken(req: any, reply: any, next: any) {
        const authorization = req.headers['authorization']
        const token = authorization && authorization?.split(' ')[1]
        if (!token) {
            return reply.status(401).send(new Error(Messages.ACESSO_NEGADO))
        }
        jwt.verify(token, process.env.JWT_SECRET, (err: any) => {
            if (err) return reply.status(403).send(new Error(Messages.TOKEN_INVALIDO))
            next()
        })
    }

    async login(req: any, reply: any) {
        const {email, password} = req.body
        const userExists: null | User = await this.userService.findByEmail(email);
        if (userExists) {
            const passwordMatch = await bcrypt.compare(password, userExists.password)
            if (!passwordMatch) {
                return reply.status(404).send(new Error(Messages.SENHA_INVALIDA))
            }
            await this.userHistoryService.updateHistory(userExists, UserHistoryEnum.LOGGED)
            const token = jwt.sign({id: userExists?.id}, process.env.JWT_SECRET)
            await this.updateToken(userExists.id, token)
            return reply.send(token)
        }
        return reply.status(422).send(new Error(Messages.USUARIO_NAO_ENCONTRADO))
    }

    async register(req: any, reply: any) {
        const {name, email, password, confirmPassword} = req.body
        try {
            const validation: string = await this.validRegister(name, email, password, confirmPassword)
            if (validation) {
                return reply.status(400).send(new Error(validation))
            }
            const salt: any = await bcrypt.genSalt(12)
            const hash: any = await bcrypt.hash(password, salt)
            const user: User = new User()
            user.name = name
            user.email = email
            user.password = hash
            await user.save()
            await this.userHistoryService.updateHistory(user, UserHistoryEnum.REGISTERED)
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)
            await this.updateToken(user.id, token)
            return reply.send(token)
        } catch (e) {
            return reply.status(400).send(e)
        }
    }

    private async updateToken(userId: number, token: string) {
        await this.userService.updateToken(userId, token);
    }

    async logout(req: any, reply: any) {
        const id = req?.params?.id
        try {
            const user: User | null = await this.userService.findById(id);
            if (user) {
                delete user.password
                await this.userHistoryService.updateHistory(user, UserHistoryEnum.LOGOUT)
                return reply.send(user)
            }
        } catch (e) {
            return reply.status(400).send(e)
        }
        return reply.status(400).send(new Error(Messages.ERRO))
    }

    private async validRegister(name: string, email: string, password: string, confirmPassword: string) {
        let validation: string | null = null
        if (validator.isEmpty(name.trim()) || validator.isEmpty(email.trim()) || validator.isEmpty(password.trim())) {
            validation = Messages.DADOS_FALTANTES
        }
        const userExists: null | User = await this.userService.findByEmail(email);
        if (userExists) {
            validation = Messages.EMAIL_JA_EXISTE
        }
        if (!validator.isEmail(email)) {
            validation = Messages.EMAIL_INVALIDO
        }
        if (!validator.isLength(password, {min: 5, max: 20})) {
            validation = Messages.SENHA_FORA_PADRAO
        }
        if (password !== confirmPassword) {
            validation = Messages.SENHAS_DIFERENTES
        }
        return validation
    }
}
