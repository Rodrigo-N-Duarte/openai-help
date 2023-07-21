import {AppDataSource} from "../../dbconfig";
import {ItemUser} from "../models/ItemUser";
import User from "../models/User";
import {Item} from "../models/Item";

export class ItemUserRepository {
    repository = AppDataSource.getRepository(ItemUser)
    async checkIfAlreadyPurchased(idItem: number, idUser: number) {
        const builder = this.repository.createQueryBuilder('i')
            .where('i.item.id = :idItem', {idItem: idItem})
            .andWhere('i.user.id = :idUser', {idUser: idUser})
        return await builder
            .select(`
            i.purchased as "purchased",
            i.datePurchased as "datePurchased",
            i.user.id as "userId",
            i.item.id as "itemId"`)
            .getRawMany();
    }
    async getPurchaseHistory(id: number) {
        const builder = this.repository.createQueryBuilder("iu")
            .innerJoin(User, "u", "iu.user.id = u.id")
            .innerJoin(Item, "i", "i.id = iu.item.id")
            .where("u.id = :id", {id:id})
        return await builder
            .select(`
            iu.id as "id",
            iu.purchased as "purchased",
            iu.datePurchased as "datePurchased",
            i.id as "idItem",
            i.name as "itemName",
            i.price as "itemPrice",
            i.description as "itemDescription"
            `)
            .orderBy("iu.datePurchased", "ASC")
            .getRawMany();
    }
}
