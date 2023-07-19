import {AppDataSource} from "../../dbconfig";
import {Item} from "../models/Item";
import {UserHistory} from "../models/UserHistory";
import {ItemUser} from "../models/ItemUser.ts";

export class ItemRepository {
    repository = AppDataSource.getRepository(Item)
    async findById(id: number) {
        const builder = this.repository.createQueryBuilder('i')
            .where('i.id = :id', {id: id})
        return await builder
            .getOne();
    }
    async findAll(userId: number) {
        const builder = this.repository.createQueryBuilder("i")
            .leftJoin(ItemUser, "iu", "iu.user.id = :userId", {userId: userId})

        return await builder
            .select(`
            i.id as "id",
            i.name as "name",
            i.price as "price",
            i.description as "description"
            `)
            .getRawMany()
    }
}
