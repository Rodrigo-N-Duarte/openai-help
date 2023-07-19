import {AppDataSource} from "../../dbconfig";
import {ItemUser} from "../models/ItemUser";

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
}
