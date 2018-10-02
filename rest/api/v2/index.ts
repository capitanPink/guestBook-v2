import { GuestBookApplication } from './application';
import { ApplicationConfig } from '@loopback/core';
import { User } from './models/user/user.model';
import { Comment } from './models/comment/comment.model';
export * from './config/data-source';

// User
//   .drop()
//   .then(
//     () => {
Comment
  .sync()
  .then(
    () => {
      const comment = new Comment({
        userId: 1,
        commentText: 'adsf;daskdas sdajfds;a f;dsa kl;jdsfljads fadsldskjflkdsaj dsal;kfjadls;kjf dsaf'
      });
      comment.save();
    },
    (error) => console.log('hehehehe')
  );
  
User
  .sync()
  .then(
    () => {
      const user = new User({
        firstName: 'James',
        lastName: 'Harold',
        email: 'isThisIsEmail@mail.com'
      });
      user.save();
    },
    (error) => console.log(`The ${error} was raised during the process`)
  );
  //   }
  // );

export async function main(options: ApplicationConfig = {}) {
  const app = new GuestBookApplication(options);
  await app.boot();
  await app.start();
  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  return app;
}