import { IPostObject } from './../../../../../shared/interfaces/i-post-object';
import { Request, RestBindings, get, ResponseObject, post, param, requestBody } from '@loopback/rest';
import { inject } from '@loopback/context';
import { repository } from '@loopback/repository';
import { UserRepository } from './../../models/user/user.repository';
import { User } from './../../models/user/user.model';

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
  async postComment(@requestBody() postObject: IPostObject): Promise<Object> {
    console.log('this is arguments', postObject);
    // const {firstName, lastName, email} = postObject;
    // const userData = {firstName, lastName, email};
    // const isUserCreated = await this.userRepository.findOne({where: {email: email}});
    // await this.userRepository.createInstance(userData);
    // await this.
    return {};
  }
}
