import {AppDataSource} from "../../dbconfig";
import {Item} from "../models/Item";
import {UserHistory} from "../models/UserHistory";

export class ItemRepository {
    repository = AppDataSource.getRepository(Item)
    async findById(id: number) {
        const builder = this.repository.createQueryBuilder('i')
            .where('i.id = :id', {id: id})
        return await builder
            .getOne();
    }
}