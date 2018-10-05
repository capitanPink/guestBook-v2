import { Comment } from './../models/comment/comment.model';
import { User } from '../models/user/user.model';
import { BaseRepository } from '../core/models/base.repository';

export class UserRepository extends BaseRepository {
  
  constructor() {
    super(User);
  }

  findByEmail(email: string) {
    return this.findOne({where: {email: email}});
  }

  allWithComments() {
    return this.findAll({include: [Comment]});
  }
}