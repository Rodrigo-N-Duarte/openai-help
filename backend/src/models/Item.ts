import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {ItemUser} from "./ItemUser";
@Entity()
export class Item extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    price: number
    @OneToMany(() => ItemUser, (itemUser: ItemUser) => itemUser.item)
    itemUser: ItemUser
}