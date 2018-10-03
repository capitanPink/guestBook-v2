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
  constructor(options: ApplicationConfig = {rest: {
    port: 8080
  }}) {
    super(options);
    this.controller(CommentsController);
    this.repository(UserRepository);
    // Set up the custom sequence
    this.sequence(MySequence);

    this.projectRoot = __dirname;

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
