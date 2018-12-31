import {
  Table,
  Column,
  Model,
  Length,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { IComment } from './../../interfaces/i-comment';

@Table
export class Comment extends Model<Comment> implements IComment {

  @Length({min: 50, max: 250})
  @Column({type: DataType.TEXT})
  commentText: string;

  @ForeignKey(() => User)
  @Column({type: DataType.TEXT})
  userEmail: string;

  @BelongsTo(() => User)
  user: User;
}