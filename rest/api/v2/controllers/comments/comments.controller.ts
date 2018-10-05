import { Request, RestBindings, get, ResponseObject, post, requestBody } from '@loopback/rest';
import { inject } from '@loopback/context';
import { IPostObject } from './../../../../../shared/interfaces/i-post-object';
import { UserCommentService } from './../../services/user-comment.service';

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
    @inject('services.userCommentService') private userCommentService: UserCommentService) {
      this.userCommentService = userCommentService;
    }

  @get('/api/v2/comments')
  async showComments(): Promise<Object> {
    return await this.userCommentService.getComments();
  }

  @post('api/v2/comments', {
    responses: {
      '200': COMMENT_RESPONSE,
    },
  })
  async postComment(@requestBody() postObject: IPostObject): Promise<Object> {
    return await this.userCommentService.postComment(postObject);
  }
}
