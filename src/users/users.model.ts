import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Cinema} from "../cinema/cinema.model";
import {UserCinemas} from "../cinema/user-cinemas.model";

interface UserAttr {
    username: string,
    email: string,
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    username: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @BelongsToMany(() => Cinema, () => UserCinemas)
    cinemas: Cinema[]
}