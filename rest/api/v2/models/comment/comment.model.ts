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


@Table
export class Comment extends Model<Comment> {

  @Length({min: 50, max: 250})
  @Column({type: DataType.TEXT})
  commentText: string;

  @ForeignKey(() => User)
  @Column
  userEmail: string;

  @BelongsTo(() => User)
  user: User;
}