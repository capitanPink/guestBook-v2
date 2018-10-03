import { UserRepository } from './../../models/user/user.repository';
import { User } from './../../models/user/user.model';
import { Request, RestBindings, get, ResponseObject, post } from '@loopback/rest';
import { inject } from '@loopback/context';
import { repository } from '@loopback/repository';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
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

/**
 * A simple controller to bounce back http requests
 */
export class CommentsController {
  // @repository(UserRepository)
  // private repository: UserRepository;
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @repository(UserRepository) private userRepository: UserRepository) {}

  // Map to `GET /ping`
  @get('/api/v2/comments', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async showComments(): Promise<Object> {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      comments: [
        await this.userRepository.all()
      ],
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }

  @post('api/v2/comments', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async postComment(postObject: IPostObject): Promise<Object> {
    const {firstName, lastName, email} = postObject;
    const userData = {firstName, lastName, email};
    this.userRepository.createInstance(userData);
  }
}
