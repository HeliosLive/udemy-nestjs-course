import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import environment from 'tools/environment/environment';
import { response } from 'express';

@Injectable()
export class UploadService {
  constructor() {
    cloudinary.v2.config({
      cloud_name: environment.cloudinary.cloud_name,
      api_key: environment.cloudinary.api_key,
      api_secret: environment.cloudinary.api_secret,
    });
  }

  async upload(files: any[]): Promise<any> {
    let result = [];
    try {
      for (const file of files) {
        await cloudinary.v2.uploader.upload(file.path, function(
          error,
          response,
        ) {
          result.push(response);
        });
      }
      return await result;
    } catch (err) {
      return await err;
    }
  }
}
