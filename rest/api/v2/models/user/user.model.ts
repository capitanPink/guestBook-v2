import { Comment } from './../comment/comment.model';
import {
  Table,
  Column,
  Model,
  Length,
  IsEmail,
  DataType,
  Unique,
  HasMany,
  PrimaryKey
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
  @PrimaryKey
  @Column({type: DataType.TEXT})
  email: string;

  @HasMany(() => Comment)
  comments: Comment[]
}