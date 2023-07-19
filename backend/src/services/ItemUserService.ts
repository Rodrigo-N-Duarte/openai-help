import {ItemUserRepository} from "../repository/ItemUserRepository";
export class ItemUserService {
    itemUserRepository = new ItemUserRepository()
    async checkIfAlreadyPurchased(idItem: number, idUser: number) {
        return await this.itemUserRepository.checkIfAlreadyPurchased(idItem, idUser);
    }
}
