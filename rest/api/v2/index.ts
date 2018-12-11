import { ApplicationConfig } from '@loopback/core';
import { DataBaseUtil } from './core/utils/database.util';
import { GuestBookApplication } from './application';
import { User } from './models/user/user.model';
import { Comment } from './models/comment/comment.model';
export * from './config/data-source';



DataBaseUtil.initializeTables([User, Comment]);

export async function main(options: ApplicationConfig = {}) {
  const app = new GuestBookApplication(options);
  await app.boot();
  await app.start();
  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  return app;
}