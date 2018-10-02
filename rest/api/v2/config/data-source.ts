import { Comment } from './../models/comment/comment.model';
import { User } from './../models/user/user.model';
import { Sequelize, ISequelizeConfig } from 'sequelize-typescript';

const databaseConfig: ISequelizeConfig = {
  host: 'localhost',
  port: 5432,
  database: 'guestbook',
  username: '',
  password: '',
  dialect: 'postgres'
}

const sequelize = new Sequelize(databaseConfig);
sequelize.addModels([User, Comment]);

export default sequelize;