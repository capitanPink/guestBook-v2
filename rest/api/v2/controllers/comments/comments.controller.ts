import { ISearchObject } from './../../../../../shared/interfaces/i-search-object';
import { Request, RestBindings, get, ResponseObject, post, requestBody, param } from '@loopback/rest';
import { inject } from '@loopback/context';
import { IPostObject } from './../../../../../shared/interfaces/i-post-object';
import { UserCommentService } from './../../services/user-comment.service';

const COMMENT_RESPONSE: ResponseObject = {
  description: 'Comment Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
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

  @get('api/v2/comments')
  async showComments(
    @param.query.string('name') firstName: string,
    @param.query.number('limit') limit: number,
    @param.query.string('email') email: string,
  ) {
    return await this.userCommentService.getComments({ firstName, limit, email });
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
