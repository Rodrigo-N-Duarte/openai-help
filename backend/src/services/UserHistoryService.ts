import User from "../models/User.ts";
import {UserHistoryEnum} from "../enum/UserHistoryEnum.ts";
import {UserHistory} from "../models/UserHistory.ts";

export class UserHistoryService {
    async updateHistory(user: User, flag: UserHistoryEnum) {
        const userHistory: UserHistory = new UserHistory()
        userHistory.user = user
        userHistory.history = flag
        userHistory.dateTime = new Date()
        await userHistory.save()
    }
}
