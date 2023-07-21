import {ItemUserRepository} from "../repository/ItemUserRepository";
export class ItemUserService {
    repository = new ItemUserRepository()
    async checkIfAlreadyPurchased(idItem: number, idUser: number) {
        return await this.repository.checkIfAlreadyPurchased(idItem, idUser);
    }
    async getPurchaseHistory(req: any, reply: any) {
        return await this.repository.getPurchaseHistory(req.params.id);
    }
}
