import { ApplicationConfig } from '@loopback/core';
import { GuestBookApplication } from './application';
import { DataBaseService } from './services/database.service';

export async function main(options: ApplicationConfig = {}) {
  const app = new GuestBookApplication(options, new DataBaseService());
  await app.boot();
  await app.start();
  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  return app;
}