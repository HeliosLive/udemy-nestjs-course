import { Model, Document } from 'mongoose';
import { AuditModel } from '../models/audit.model';
import { FilterModel } from '../models/filter.model';

interface A extends AuditModel, Document {}
export class ResourceService<T extends A, D extends any> {
  constructor(protected readonly mongoModel: Model<T>) {}

  generalSearchQuery = {
    page: 1,
    size: 10,
    sort: 'asc',
    sortBy: '_id',
    queryText: '',
    searchBy: 'name',
  };

  async create(model: D): Promise<T> {
    const audit = new AuditModel();
    audit.active = true;
    audit.createdBy = 'Admin';
    audit.createdDate = new Date();
    const newModal = { ...audit, ...(model as {}) };

    const createdNew = new this.mongoModel(newModal);
    return await createdNew.save();
  }

  async findAll(query?: FilterModel): Promise<any[]> {
    if (query && Object.keys(query).length !== 0) {
      const searchValue = await { ...this.generalSearchQuery, ...query };
      const filterRegex = new RegExp(searchValue.queryText, 'i');
      const today = new Date();
      // previous 2 weeks
      today.setHours(today.getHours() - 24 * 14);

      const count = await this.mongoModel.countDocuments({}).exec();
      let data;
      if (query?.startDate && query?.endDate) {
        data = await this.mongoModel
          .find({
            [searchValue.searchBy]: filterRegex,
            'audit.createdDate': {
              $gte: new Date(
                query.startDate ? query.startDate : today.toISOString(),
              ),
              $lt: new Date(
                query.endDate ? query.endDate : new Date().toISOString(),
              ),
            },
          } as any)
          .limit(Math.max(0, searchValue.size))
          .skip(searchValue.size * (searchValue.page - 1))
          .sort([[`${searchValue.sortBy}`, searchValue.sort]])
          .exec();
      } else {
        data = await this.mongoModel
          .find({
            [searchValue.searchBy]: filterRegex,
          } as any)
          .limit(Math.max(0, searchValue.size))
          .skip(searchValue.size * (searchValue.page - 1))
          .sort([[`${searchValue.sortBy}`, searchValue.sort]])
          .exec();
      }

      return await [
        {
          success: true,
          size: query.size ? query.size : this.generalSearchQuery.size,
          total: count,
          data,
        },
      ];
    } else {
      const count = await this.mongoModel.countDocuments({}).exec();
      const data = await this.mongoModel.find().exec();
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
    try {
      return await this.mongoModel.findOne({ _id: id as any }).exec();
    } catch (error) {
      return await undefined;
    }
  }

  async findOneByName(name: string): Promise<T> {
    return await this.mongoModel.findOne({ name: name as any }).exec();
  }

  async findOneByEmail(email: string): Promise<T> {
    return await this.mongoModel.findOne({ email: email as any }).exec();
  }

  async findOneBySerialId(serial_id: string): Promise<T> {
    return await this.mongoModel
      .findOne({ serial_id: serial_id as any })
      .sort([[`audit.createdDate`, 'DESC']])
      .exec();
  }

  async delete(id: string): Promise<T> {
    return await this.mongoModel.findByIdAndRemove({ _id: id }).exec();
  }

  async update(id: string, dto: D): Promise<T> {
    let newModal = this.mongoModel.findOne({ _id: id as any }).exec();
    newModal = { ...newModal, ...(dto as {}) };
    return await this.mongoModel
      .findByIdAndUpdate(id, newModal as any, { new: true })
      .exec();
  }
}
