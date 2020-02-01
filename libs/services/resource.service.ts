import { AuditModel } from 'tools/models/audit.model';
import { Model } from 'mongoose';
import { FilterModel } from 'tools/models/filter.model';

export class ResourceService<T extends any, C extends any, U extends any> {
  constructor(protected readonly mongoModel: Model<T>) {}

  generalSearchQuery = {
    page: 1,
    size: 10,
    sort: 'ASC',
    sortBy: '_id',
    queryText: '',
    searchBy: 'name',
  };

  async create(model: C): Promise<T> {
    const audit = new AuditModel();
    audit.active = true;
    audit.createdBy = 'Admin';
    audit.createdDate = new Date();

    const createdModel = new this.mongoModel({ ...model, ...audit });

    return await createdModel.save();
  }

  async findAll(query?: FilterModel): Promise<any[]> {
    if (Object.keys(query).length !== 0) {
      const searchValue = await { ...this.generalSearchQuery, ...query };
      const userRegex = new RegExp(searchValue.queryText, 'i');

      return await this.mongoModel
        .find({
          [searchValue.searchBy]: userRegex,
        })
        .limit(Math.max(0, searchValue.size))
        .skip(searchValue.size * (searchValue.page - 1))
        .sort([[`${searchValue.sortBy}`, searchValue.sort]])
        .exec();
    } else {
      const count = await this.mongoModel.countDocuments({}).exec();
      const data = await this.mongoModel
        .find()
        .limit(Math.max(0, this.generalSearchQuery.size))
        .skip(this.generalSearchQuery.size * (this.generalSearchQuery.page - 1))
        .sort([
          [`${this.generalSearchQuery.sortBy}`, this.generalSearchQuery.sort],
        ])
        .exec();
      return await [
        {
          success: true,
          size: this.generalSearchQuery.size,
          total: count,
          data,
        },
      ];
    }
  }

  async findOne(id: string): Promise<T> {
    return await this.mongoModel.find({ _id: id }).exec();
  }

  async delete(id: string): Promise<T> {
    return await this.mongoModel.findByIdAndRemove({ _id: id }).exec();
  }

  async update(id: string, dto: U): Promise<T> {
    let newModel = this.mongoModel.findOne({ _id: id }).exec();
    newModel = { ...newModel, ...dto };

    return await this.mongoModel
      .findByIdAndUpdate(id, newModel, { new: true })
      .exec();
  }
}
