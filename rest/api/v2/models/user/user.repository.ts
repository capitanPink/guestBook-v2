import { User } from './user.model';
import { BaseRepository } from './../../core/models/base.repository';

export class UserRepository extends BaseRepository {
  
  constructor() {
    super(User);
  }
}