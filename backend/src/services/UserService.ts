import User from "../models/User";
import {Messages} from "../utils/Messages";
import {UserRepository} from "../repository/UserRepository.ts";
export class UserService {
    repository = new UserRepository();
    async findByParamId(req: any, reply: any) {
        let user: User | null = await this.repository.findById(req.params.id);
        delete user?.password
        return user
    }
    async findById(id: number) {
        let user: User | null = await this.repository.findById(id);
        return user
    }
    async findByEmail(email: string) {
        let user: User | null = await this.repository.findByEmail(email)
        return user
    }
}
