import { Model } from 'sequelize-typescript';
import { Filter } from 'loopback-datasource-juggler';

export class BaseRepository {

  constructor(protected model: any) {}

  async all() {
    return await this.model.all();
  }

  findOne(filter: Filter) {
    return this.model.findOne(filter);
  }

  findAll(filter: Filter) {
    return this.model.findAll(filter);
  }

  findAndCountAll(filter: Filter) {
    return this.model.findAndCountAll(filter);
  }

  destroy(filter: Filter) {
    return this.model.destroy(filter);
  }
}