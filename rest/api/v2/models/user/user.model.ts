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
  PrimaryKey,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import { IUser } from '../../interfaces/i-user';
import { IComment } from '../../interfaces/i-comment';

@Table
export class User extends Model<User> implements IUser {

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
  comments: IComment[];
}