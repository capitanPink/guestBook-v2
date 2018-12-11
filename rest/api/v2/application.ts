import { CommentsController } from './controllers/comments/comments.controller';
import { BootMixin } from '@loopback/boot';
import { Context, inject } from '@loopback/context';
import { ApplicationConfig } from '@loopback/core';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import { MySequence } from './sequence';
import { UserRepository } from './repositories/user.repository';
import { CommentRepository } from './repositories/comment.repository';
import { UserCommentService } from './services/user-comment.service';

export class GuestBookApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    this.repository(UserRepository);
    this.repository(CommentRepository);
    this.bind('services.userCommentService').toClass(UserCommentService);
    this.sequence(MySequence);

    this.projectRoot = __dirname;

    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.ts'],
        nested: true,
      },
    };
  }
}
