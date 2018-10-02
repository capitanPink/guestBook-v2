import {
  Table,
  Column,
  Model,
  Length,
  IsEmail,
  DataType,
  Unique,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {

  @Length({min: 3})
  @Column({type: DataType.TEXT})
  firstName: string;

  @Length({min: 3})
  @Column({type: DataType.TEXT})
  lastName: string

  @Unique
  @IsEmail
  @Column({type: DataType.TEXT})
  email: string;
}