import { Comment } from '../models/comment/comment.model';
import { User } from '../models/user/user.model';
import { Sequelize, Model } from 'sequelize-typescript';
import { DBConfig } from '../config/config-dev';

type TModels = (typeof Model)[];

export class DataBaseService {

  models: {
    [K: string]: typeof Model
  };

  constructor(
    private _models: TModels = [User, Comment],
    private _dbConfig: DBConfig = new DBConfig,
    private _sequelize?: Sequelize) {

    this._sequelize = new Sequelize(this._dbConfig.getConfig);
    this._sequelize.addModels(_models);
    this._initializeTables(_models);
    this.models = {
      user: User,
      comment: Comment
    };
  }

  private _initializeTables(tablesList: TModels) {
    tablesList.forEach((table: any) => {
      table.sync()
        .then(() => console.log(`${new Date} Table ${table} was successfully created.`),
          (error: Error) => console.log(`Error was raised during the process, see details: ${error}`)
        );
      // table.drop()
      // .then(
      //   () => {
      //     console.log(`${new Date} Table ${table} was successfully droped.`);
      //     table.sync()
      //     .then(
      //       () => console.log(`${new Date} Table ${table} was successfully created.`),
      //       (error: Error) => console.log(`Error was raised during the process, see details: ${error}`)
      //     );
      //   },
      //   (error: Error) => console.log(`Error was raised during the process, see details: ${error}`)
      // )
    });
  }
}