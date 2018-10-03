import { Filter } from 'loopback-datasource-juggler';

export class BaseRepository {

  constructor(protected model: any) {}

  all() {
    return this.model.all();
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

  createInstance(instanceData: any) {
    return new this.model(instanceData).save();
  }
}