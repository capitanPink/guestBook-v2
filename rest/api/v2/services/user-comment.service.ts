import { repository } from '@loopback/repository';

import { CommentRepository } from './../repositories/comment.repository';
import { UserRepository } from './../repositories/user.repository';
import { User } from '../models/user/user.model';
import { Comment } from './../models/comment/comment.model';
import { IPostObject } from './../../../../shared/interfaces/i-post-object';
import { ICommentObject } from './../../../../shared/interfaces/i-comment-object';
import { IUser } from '../interfaces/i-user';
import { IComment } from '../interfaces/i-comment';


export class UserCommentService {

  constructor(@repository(UserRepository) private userRepository: UserRepository,
              @repository(CommentRepository) private commentRepository: CommentRepository) {}

  async getFilteredComments(searchObject: any) {
    const { firstName, email, commentPerPage } = searchObject;
    const where = email && firstName ? { email, firstName }
                    : firstName ? { firstName }
                    :  email ? { email } : {};
    const include = firstName || email ? [Comment] : [];

    const filter = {
      where,
      include,
      limit: commentPerPage
    };
    const users = await this.userRepository.findAll(filter);
    return this.formCommentsListObject(users);
  }

  async getAllComments(options: { limit: number, offset?: number } | any = { limit: 10} ) {
    const filter = Object.keys(options)
                         .reduce((acc, next) => 
                           Object.assign(acc, { [next]: options[next] }), { include: [User] });
    return (await this.commentRepository.findAll(filter))
                                        .map((item: any): ICommentObject => {                                          
                                          const commentObject = Object.assign({}, item, item.user);
                                          // delete commentObject.user;
                                          return commentObject;
                                        });
  }

  async postComment(postObject: IPostObject) {
    const { firstName, lastName, email, commentText } = postObject;
    const userData = { firstName, lastName, email };
    const commentData = { userEmail: email, commentText };
    const isUserCreated = await this.userRepository.findByEmail(email);
    if (!isUserCreated) {
      await this.userRepository.createInstance(userData);
      await this.commentRepository.createInstance(commentData);
    } else {
      await this.commentRepository.createInstance(commentData);
    }
    return {};
  }

  private formCommentsListObject(users: IUser[]) {
    return users
            .map((user) => user.comments
            .map((comment: IComment) => this.formCommentObject(user, comment)))
            .reduce((acc, next) => acc.concat(next), []);
  }

  private formCommentObject(user: IUser, comment: IComment) {
    return {
      id: comment.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      commentText: comment.commentText
    };
  }
}