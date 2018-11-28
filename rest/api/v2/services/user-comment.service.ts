import { repository } from '@loopback/repository';
import { inject } from '@loopback/core';

import { CommentRepository } from './../repositories/comment.repository';
import { UserRepository } from './../repositories/user.repository';
import { User } from '../models/user/user.model';
import { Comment } from './../models/comment/comment.model';
import { IPostObject } from './../../../../shared/interfaces/i-post-object';
import { DataBaseService } from './database.service';

export class UserCommentService {

  constructor(@repository(UserRepository) private userRepository: UserRepository,
              @repository(CommentRepository) private commentRepository: CommentRepository) {}

  async getFilteredComments(searchObject: any) {
    const { firstName, email, commentPerPage = 10, offset } = searchObject;
    const where = email && firstName ? { email, firstName }
                    : firstName ? { firstName }
                    :  email ? { email } : {};
    const include = firstName || email
      ? { include: { 
        model: [Comment],
        where: {
            offset: offset ? offset : 0,
            limit: commentPerPage ? commentPerPage : 1000
          }
        }
      }: [];

    const filter = {
      where,
      include,
      limit: commentPerPage,
      raw: true,
      offset: offset ? offset : 0
    };
    
    return await this.userRepository
            .findAll(filter)
            .reduce((acc: any, next: any) => acc.concat([{
              id: next['comments.id'],
              firstName: next.firstName,
              lastName: next.lastName,
              email: next.email,
              commentText: next['comments.commentText']
            }]), []);
  }

  async getAllComments(options: { limit: number, offset?: number } | any = { limit: 10} ) {
    const filter = Object.keys(options)
                         .reduce((acc, next) => 
                           Object.assign(acc, { [next]: options[next] }), { include: [User] });
    
    return await this.commentRepository
            .findAll({...filter, raw: true })
            .reduce((acc: any, next: any) => acc.concat([{
                id: next.id,
                firstName: next['user.firstName'],
                lastName: next['user.lastName'],
                email: next.userEmail,
                commentText: next.commentText
              }]), []);
  }

  async postComment(postObject: IPostObject) {
    const { firstName, lastName, email, commentText } = postObject;
    const userData = { firstName, lastName, email };
    const commentData = { userEmail: email, commentText };
    const isUserCreated = await this.userRepository.findByEmail(email);
    if (!isUserCreated) {
      try {
        await this.userRepository.createInstance(userData);
        await this.commentRepository.createInstance(commentData);
      } catch(e) {
        console.log(`Error is raised: ${e.message}`)
      }
    } else {
      await this.commentRepository.createInstance(commentData);
    }
    return {};
  }

}