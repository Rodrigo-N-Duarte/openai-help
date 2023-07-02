import User from "../models/User";
import {Messages} from "../utils/Messages";
export class UserService {
    async findById(req: any, reply: any) {
        let user: User | null = await User.findById(req.params.id);
        delete user?.password
        return user
    }
    async createUser(req: any, reply: any) {
        const body = req.body
        const user: User | null = await User.findByEmail(body.email)
        if (!user) {
            try {
                const newUser = new User()
                newUser.name = body.name
                newUser.email = body.email
                newUser.password = body.password
                await newUser.save()
                return reply.send(newUser)
            } catch (e) {
                return reply.status(400).send(e)
            }
        }
        return reply.status(400).send("Já existe um usuário com esse email!")
    }

     async updateUser(req: any, reply: any) {
         const body = req.body
         const user: User | null = await User.findById(body.id)
         if (user) {
             try {
                 user.name = body.name
                 user.email = body.email
                 user.password = body.password
                 await user.save()
                 return reply.send(user)
             } catch (e) {
                 return reply.status(400).send(e)
             }
         }
         return reply.status(400).send(Messages.erro)
     }
}
