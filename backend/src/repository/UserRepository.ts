import {AppDataSource} from "../../dbconfig.ts";
import User from "../models/User.ts";
import {UserHistory} from "../models/UserHistory";
export class UserRepository {
    repository = AppDataSource.getRepository(User)
    async findById(id: number) {
        const builder = this.repository.createQueryBuilder('u')
            .innerJoin(UserHistory, 'uh', "uh.user.id = u.id")
            .where('u.id = :id', {id: id})
            .andWhere("uh.history = 'REGISTERED'")
        return await builder
            .select(`
            u.id as "id",
            u.name as "name",
            u.email as "email",
            u.password as "password",
            u.level as "level",
            u.xp as "xp",
            u.points as "points",
            uh.dateTime as "registeredDate"`)
            .getRawMany();
    }
    async findByEmail(email: string) {
        const builder = this.repository.createQueryBuilder('u')
            .where('u.email = :email', {email: email})
        return await builder
            .getOne();
    }
}
