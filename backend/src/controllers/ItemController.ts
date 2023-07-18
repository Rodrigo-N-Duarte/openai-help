import {ItemService} from "../services/ItemService";

const itemService = new ItemService();
export class ItemController {
    async purchaseItem(req: any, reply: any) {
        return await itemService.purchaseItem(req, reply);
    }
    async createItem(req: any, reply: any) {
        return await itemService.createItem(req, reply);
    }
}