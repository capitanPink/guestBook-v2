import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';

import { MySequence } from './sequence';
import { UserRepository } from './repositories/user.repository';
import { CommentRepository } from './repositories/comment.repository';
import { UserCommentService } from './services/user-comment.service';
import { User } from './models/user/user.model';
import { Comment } from './models/comment/comment.model';
import { DataBaseService } from './services/database.service';

export class GuestBookApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(public options: ApplicationConfig = {},
              public dataBase?: DataBaseService) {
    super(options);
    this.repository(UserRepository);
    this.repository(CommentRepository);
    this.bind('services.userCommentService').toClass(UserCommentService);
    this.bind('services.dataBaseService').toClass(DataBaseService);
    this.bind('models.comment').toClass(Comment);
    this.bind('models.user').toClass(User);
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
