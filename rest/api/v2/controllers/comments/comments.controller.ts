import { Request, RestBindings, get, ResponseObject, post, param, requestBody } from '@loopback/rest';
import { inject } from '@loopback/context';
import { repository } from '@loopback/repository';
import { UserRepository } from '../../repositories/user.repository';
import { CommentRepository } from '../../repositories/comment.repository';
import { IPostObject } from './../../../../../shared/interfaces/i-post-object';

const COMMENT_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            patternProperties: {
              '^.*$': {type: 'string'},
            },
            additionalProperties: false,
          },
        },
      },
    },
  },
};

export class CommentsController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @repository(UserRepository) private userRepository: UserRepository,
    @repository(CommentRepository) private commentRepository: CommentRepository) {}

  @get('/api/v2/comments')
  async showComments(): Promise<Object> {
    return {
      comments: await this.userRepository.allWithComments()
    };
  }

  @post('api/v2/comments', {
    responses: {
      '200': COMMENT_RESPONSE,
    },
  })
  async postComment(@requestBody() postObject: IPostObject): Promise<Object> {
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
