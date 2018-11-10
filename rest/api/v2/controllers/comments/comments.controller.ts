import { Request, RestBindings, get, ResponseObject, post, requestBody, param } from '@loopback/rest';
import { inject } from '@loopback/context';
import { DataBaseService } from '../../services/database.service';
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
    @inject('services.userCommentService') private userCommentService: UserCommentService,
    @inject('services.dataBaseService') private dataBaseService: DataBaseService) {
      this.userCommentService = userCommentService;
    }

  @get('api/v2/comments')
  showComments(
    @param.query.string('firstName') firstName: string,
    @param.query.number('commentPerPage') commentPerPage: number,
    @param.query.string('email') email: string,
  ) {
    console.log('this.database', this.dataBaseService.models);
    return this.userCommentService.getComments({firstName, email, commentPerPage});
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
