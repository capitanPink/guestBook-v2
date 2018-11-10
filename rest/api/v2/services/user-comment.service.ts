import { repository } from '@loopback/repository';
import { inject } from '@loopback/core';

import { CommentRepository } from './../repositories/comment.repository';
import { UserRepository } from './../repositories/user.repository';
import { User } from '../models/user/user.model';
import { Comment } from './../models/comment/comment.model';
import { IPostObject } from './../../../../shared/interfaces/i-post-object';
import { IComment } from '../interfaces/i-comment';

import { ICommentObject } from '../../../../shared/interfaces/i-comment-object';


export class UserCommentService {

  private _users: any[];

  constructor(@repository(UserRepository) private userRepository: UserRepository,
              @repository(CommentRepository) private commentRepository: CommentRepository) {}

  async getComments(searchObject: any) {
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

    this._users = await this.userRepository.findAll(filter);
    if (include.length) {
      return this.formCommentsListObject();
    } 
    const comments = await this.commentRepository.findAll(filter);
    return this.formCommentsListObject(comments);
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

  private formCommentsListObject(comments?: Comment[]) {
    if (!comments) {
      return this._users
              .map((user) => user.comments
              .map((comment: Comment) => this.formCommentObject(user, comment)))
              .reduce((acc, next) => acc.concat(next), []);
    }
    return comments.map((comment: Comment) => {
      const user = this._users.find((user: User) => user.email === comment.userEmail);
      return this.formCommentObject(user, comment);
    });
  }

  private formCommentObject(user: User, comment: Comment) {
    return {
      id: comment.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      commentText: comment.commentText
    };
  }


}