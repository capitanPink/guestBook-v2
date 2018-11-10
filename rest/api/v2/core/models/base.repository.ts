import { IFindOptions, Model } from "sequelize-typescript";

export class BaseRepository {

  constructor(protected model: any) {}

  all() {
    return this.model.all();
  }

  findOne(include: any) {
    return this.model.findOne(include);
  }

  findAll(filter: IFindOptions<any>) {
    return this.model.findAll(filter);
  }

  findAndCountAll(filter: IFindOptions<any>) {
    return this.model.findAndCountAll(filter);
  }

  destroy(filter: IFindOptions<any>) {
    return this.model.destroy(filter);
  }

  createInstance(instanceData: any) {
    return new this.model(instanceData).save();
  }
}
