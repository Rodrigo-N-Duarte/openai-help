import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany} from 'typeorm'
import {UserHistory} from "./UserHistory.ts";
import {ItemUser} from "./ItemUser";

@Entity("user")
class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    email: string
    @Column()
    password:string
    @Column({default: ""})
    jwt:string
    @Column({default: 0})
    level: number
    @Column({default: 0})
    xp: number
    @Column({default: 0})
    points: number
    @OneToMany(() => UserHistory, (history: UserHistory) => history.user)
    history: UserHistory
    @OneToMany(() => ItemUser, (itemUser: ItemUser) => itemUser.user)
    itemUser: ItemUser
}

export default User
