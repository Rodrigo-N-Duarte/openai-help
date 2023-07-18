import {Type} from "@sinclair/typebox";
export class ItemSchema {
    purchase = {
        body: Type.Object({
            itemId: Type.Number(),
            userId: Type.Number()
        })
    };
    create = {
        body: Type.Object({
            name: Type.String(),
            price: Type.Number()
        })
    }
}