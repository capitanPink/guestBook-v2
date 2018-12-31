import { ISequelizeConfig } from "sequelize-typescript";

export class DBConfig {

  private _DBConfig: {
    [K: string]: ISequelizeConfig
  } = {
      DEV: {
        host: 'localhost',
        port: 5431,
        database: 'guestbook',
        username: 'test',
        password: 'test',
        dialect: 'postgres'
      }
    };

  constructor(public env: string | undefined = process.env.NODE_ENV) { }

  get getConfig(): ISequelizeConfig {
    switch (process.env.NODE_ENV) {
      case 'develop':
      default:
        return this._DBConfig.DEV;
    }
  }
}
