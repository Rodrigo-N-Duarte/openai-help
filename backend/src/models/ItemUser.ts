import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "./User";
import {Item} from "./Item";

@Entity()
export class ItemUser extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    purchased: boolean
    @Column()
    datePurchased: Date
    @ManyToOne(() => User, (user: User) => user.itemUser)
    user: User
    @ManyToOne(() => Item, (item: Item) => item.itemUser)
    item: Item
}