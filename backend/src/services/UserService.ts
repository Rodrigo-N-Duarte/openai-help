import User from "../models/User";
import {Messages} from "../utils/Messages";
import {UserRepository} from "../repository/UserRepository.ts";
export class UserService {
    repository = new UserRepository();
    async findAll(req: any, reply: any) {
        return await this.repository.findAll()
    }
    async findByParamId(req: any, reply: any) {
        let entity: any = await this.repository.findById(req.params.id);
        const user: User | null = entity[0]
        if (user) {
            delete user?.password
            return user
        }
        return null
    }
    async findById(id: number) {
        let entity: any = await this.repository.findById(id);
        if(entity[0]) {
            return entity[0]
        }
        return null
    }
    async findByEmail(email: string) {
        let user: User | null = await this.repository.findByEmail(email)
        return user ? user : null
    }

    async updateToken(userId: number, token: string) {
        await this.repository.updateToken(userId, token);
    }

    async updateUserPoints(idUser: number, points: number, flag: string) {
        let user: User = await this.findById(idUser)
        let newPoints;
        switch (flag) {
            case '+':
                newPoints = user.points + points
                break;
            case '-':
                newPoints = user.points - points
                break;
        }
        return await this.repository.updatePoints(idUser, newPoints)
    }
}
