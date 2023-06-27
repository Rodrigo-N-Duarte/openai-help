import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm'

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

    static async findById(id: number) {
        const builder = this.createQueryBuilder('u')
            .where('u.id = :id', {id: id})

        return await builder
            .getOne();
    }
    static async findByEmail(email: string) {
        const builder = this.createQueryBuilder('u')
            .where('u.email = :email', {email: email})

        return await builder
            .getOne();
    }
}

export default User