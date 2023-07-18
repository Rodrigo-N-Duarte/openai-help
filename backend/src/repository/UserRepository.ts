import {AppDataSource} from "../../dbconfig.ts";
import User from "../models/User.ts";
export class UserRepository {
    repository = AppDataSource.getRepository(User)
    async findById(id: number) {
        const builder = this.repository.createQueryBuilder('u')
            .where('u.id = :id', {id: id})
        return await builder
            .getOne();
    }
    async findByEmail(email: string) {
        const builder = this.repository.createQueryBuilder('u')
            .where('u.email = :email', {email: email})
        return await builder
            .getOne();
    }
}
