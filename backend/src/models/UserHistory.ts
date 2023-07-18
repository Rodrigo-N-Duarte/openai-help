import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, BaseEntity} from "typeorm";
import {UserHistoryEnum} from "../enum/UserHistory.ts";
import User from "./User";

@Entity()
export class UserHistory extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    dateTime: Date
    @Column({type: "varchar"})
    history: UserHistoryEnum
    @ManyToOne(() => User, (user) => user.history, {cascade: true, lazy: true, onDelete: "CASCADE"})
    @JoinColumn({name: 'id_usuario'})
    user: User
}
