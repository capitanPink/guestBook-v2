import {
  Table,
  Column,
  Model,
  Length,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../user/user.model';


@Table
export class Comment extends Model<Comment> {

  @ForeignKey(() => User)
  @Column
  userEmail: string;

  @Length({min: 50, max: 250})
  @Column({type: DataType.TEXT})
  commentText: string;
}