import { IComment } from './../interfaces/i-comment';
import { Comment } from './../models/comment/comment.model';
import { User } from '../models/user/user.model';
import { BaseRepository } from '../core/models/base.repository';
import { Model } from 'sequelize-typescript';

export class UserRepository extends BaseRepository {
  
  constructor() {
    super(User);
  }

  findByEmail(email: string) {
    return this.findOne({where: {email: email}});
  }

  allWithComments() {
    return this.findAll({include: undefined});
  }

  testMethod() {
    return this;
  }
}