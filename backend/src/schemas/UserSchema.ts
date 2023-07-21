import {Type} from "@sinclair/typebox";

export class UserSchema {
    findById = {
        params: Type.Object({
            id: Type.Number()
        })
    }
    getHistory = {
        params: Type.Object({
            id: Type.Number()
        })
    }
}
