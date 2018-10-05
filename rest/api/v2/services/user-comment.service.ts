import { IComment } from './../interfaces/i-comment';
import { User } from './../models/user/user.model';
import { repository } from '@loopback/repository';
import { CommentRepository } from './../repositories/comment.repository';
import { UserRepository } from './../repositories/user.repository';
import { IPostObject } from './../../../../shared/interfaces/i-post-object';

export class UserCommentService {

  constructor(@repository(UserRepository) private userRepository: UserRepository,
              @repository(CommentRepository) private commentRepository: CommentRepository) {}

  async getComments() {
    const users = await this.userRepository.all();
    const comments = await this.commentRepository.all();
    const commentsObject = comments.map((comment: IComment) => {
      const user = users.find((user: User) => {
        user.email === comment.email;
        return user;
      });
      return {
        id: comment.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        commentText: comment.commentText
      };
    });
    return commentsObject;
  }

  getCommentsByEmail() {

  }

  async postComment(postObject: IPostObject) {
    const {firstName, lastName, email, commentText} = postObject;
    const userData = {firstName, lastName, email};
    const commentData = {userEmail: email, commentText};
    const isUserCreated = await this.userRepository.findByEmail(email);
    if (!isUserCreated) {
      await this.userRepository.createInstance(userData);
      await this.commentRepository.createInstance(commentData);
    } else {
      await this.commentRepository.createInstance(commentData);
    }
    return {};
  }

}

// @repository(UserRepository) private userRepository: UserRepository,
// @repository(CommentRepository) private commentRepository: CommentRepository,