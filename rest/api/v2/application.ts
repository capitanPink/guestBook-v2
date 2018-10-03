import { IPostObject } from './../../../shared/interfaces/i-post-object';
import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import { MySequence } from './sequence';
import { UserRepository } from './models/user/user.repository';
import { CommentsController } from './controllers/comments/comments.controller';

export class GuestBookApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    // this.controller(CommentsController);
    this.repository(UserRepository);
    // this.bind('comments.postObject').to(IPostObject);
    // Set up the custom sequence
    this.sequence(MySequence);

    this.projectRoot = __dirname;

    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.ts'],
        nested: true,
      },
    };
  }
}
