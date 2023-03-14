import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {UserCinemas} from "./user-cinemas.model";

interface CinemaAttr {
    name: string,
    cinemaNumber: number,
    image: string,
    date: string,
    language: string,
    rate: number
}

@Table({tableName: 'cinema'})
export class Cinema extends Model<Cinema, CinemaAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, unique: true})
    cinemaNumber: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    @Column({type: DataType.STRING})
    date: string;

    @Column({type: DataType.STRING})
    language: string;

    @Column({type: DataType.INTEGER})
    rate: number;

    @BelongsToMany(() => User, () => UserCinemas)
    users: User[]
}
