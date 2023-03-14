import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {Cinema} from "./cinema.model";

@Table({tableName: 'user_cinemas'})
export class UserCinemas extends Model<UserCinemas> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Cinema)
    @Column({type: DataType.INTEGER})
    cinemaId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
}