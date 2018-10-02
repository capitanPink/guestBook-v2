import { UserRepository } from './models/user/user.repository';
import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import { MySequence } from './sequence';
import { PingController } from './controllers';
import { CommentsController } from './controllers/comments/comments.controller';

export class GuestBookApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {rest: {
    port: 8080
  }}) {
    super(options);
    // this.controller(PingController);
    this.controller(CommentsController);
    this.repository(UserRepository);
    // this.bind('repositories.UserRepository').toClass(CommentsController);
    // Set up the custom sequence
    this.sequence(MySequence);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers/**'],
        extensions: ['.ts'],
        nested: true,
      },
    };
  }
}
