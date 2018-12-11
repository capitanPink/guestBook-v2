import { Comment } from '../models/comment/comment.model';
import { BaseRepository } from '../core/models/base.repository';

export class CommentRepository extends BaseRepository {
  
  constructor() {
    super(Comment);
  }
}