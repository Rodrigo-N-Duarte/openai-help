import {ItemUser} from "../models/ItemUser";
import {ItemRepository} from "../repository/ItemRepository";
import {UserService} from "./UserService";
import {Messages} from "../utils/Messages";
import {ItemUserService} from "./ItemUserService";
import {Item} from "../models/Item";
import User from "../models/User.ts";

export class ItemService {
    itemRepository = new ItemRepository();
    userService = new UserService();
    itemUserService = new ItemUserService()

    async createItem(req: any, reply: any) {
        try {
            const body = req.body
            const item = new Item()
            item.name = body.name
            item.price = body.price
            await item.save()
            return item
        } catch (e) {
            return reply.status(400).send(Messages.ERRO)
        }
    }
    async getAll(req: any, reply: any) {
        try {
            const items: Item[] = await this.itemRepository.findAll(req.params.userId)
            for (let item of items) {
                const itemUser = await this.itemUserService.checkIfAlreadyPurchased(item.id, req.params.userId)
                if (itemUser[0]) {
                    item = Object.assign(item, itemUser[0])
                }
            }
            return items
        } catch (e) {
            return reply.status(400).send(e)
        }
    }
    async purchaseItem(req: any, reply: any) {
        try {
            const body = req.body
            const item: Item | null = await this.itemRepository.findById(body.itemId)
            const user: User | null = await this.userService.findById(body.userId)
            const alreadyPurchased = await this.itemUserService.checkIfAlreadyPurchased(body.itemId, body.userId)
            if (user && item && !alreadyPurchased[0]) {
                if (user.points >= item.price) {
                    await this.userService.updateUserPoints(body.userId, item.price, '-')
                    const itemUser = new ItemUser();
                    itemUser.item = item
                    itemUser.datePurchased = new Date()
                    itemUser.user = user
                    itemUser.purchased = true
                    await itemUser.save()
                    delete itemUser.user
                    return itemUser
                }
                return reply.status(400).send(Messages.SALDO_INSUFICIENTE)
            }
            return reply.status(400).send(Messages.ERRO)
        } catch (e) {
            return reply.status(400).send(Messages.ERRO)
        }
    }
}
