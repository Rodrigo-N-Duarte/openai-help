import {ItemUserService} from "../services/ItemUserService";

const itemUserService = new ItemUserService()
export class ItemUserController {

    async getPurchaseHistory(req: any, reply: any) {
        return await itemUserService.getPurchaseHistory(req, reply)
    }
}