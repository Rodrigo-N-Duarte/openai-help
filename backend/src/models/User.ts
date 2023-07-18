import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany} from 'typeorm'
import {UserHistory} from "./UserHistory.ts";

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
    @OneToMany(() => UserHistory, (history) => history.user)
    history: UserHistory
}

export default User
